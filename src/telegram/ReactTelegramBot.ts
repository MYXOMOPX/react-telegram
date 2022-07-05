import TelegramBot from "node-telegram-bot-api";
import {createRTReconciler} from "../reconciler";
import {parseMessageForSend, parseMessageForUpdate} from "./node-parser/rtNodeParser";
import {ReactTelegramBot} from "./type";
import {createRTDocument} from "../host/document/RTDocument";
import RTMessageElement = ReactTelegram.RTMessageElement;
import RTRootElement = ReactTelegram.RTRootElement;
import ChatID = ReactTelegram.ChatID;
import {createMessageRenderQueue} from "./MessageRenderQueue";
import {CallbackQueryAnswer, RTCallbackQueryEvent} from "../../type/events";
import {TypedEventEmitter} from "../util";


export const createReactTelegramBot = (apiBot: TelegramBot) => {

    const reactBot = apiBot as ReactTelegramBot;
    const rtDocument = createRTDocument();
    const messageQueue = createMessageRenderQueue();

    reactBot.events = new TypedEventEmitter();

    const renderMessageSend = async (root: RTRootElement, message: RTMessageElement) => {
        message.rerenderStatus = "Parsing";
        const msgForSend = await parseMessageForSend(message);
        message.rerenderStatus = "Sending";
        if (msgForSend.type === "text") {
            const msg = await apiBot.sendMessage(root.chatId, msgForSend.text, {
                parse_mode: "HTML",
                reply_markup: msgForSend.reply_markup
            });
            message.messageId = msg.message_id;
            rtDocument.emitOwnMessageEvent({
                message: msg,
                messageUuid: message.uuid
            })
            // emit event about messageId changed
        }
        message.rerenderStatus = "None";
    }

    const renderMessageUpdate = async (root: RTRootElement, message: RTMessageElement) => {
        message.rerenderStatus = "Parsing";
        const msgForUpdate = await parseMessageForUpdate(message);
        message.rerenderStatus = "Sending";
        if (msgForUpdate.type === "text") {
            await apiBot.editMessageText(msgForUpdate.text, {
                parse_mode: "HTML",
                chat_id: root.chatId,
                message_id: message.messageId,
                reply_markup: msgForUpdate.reply_markup
            })
        }
        message.rerenderStatus = "None";
    }

    // Here will be problem, if message removed from Document in time when we sending it.
    const renderMessageRemove = async (root: RTRootElement, message: RTMessageElement) => {
        if (!message.messageId) return;
        message.rerenderStatus = "Removing"
        await apiBot.deleteMessage(root.chatId, String(message.messageId))
        message.rerenderStatus = "None"
    }


    const onRender = async (root: RTRootElement, renderDescriptor: ReactTelegram.MessagesToRender) => {
        if (renderDescriptor.created && renderDescriptor.created.length > 0) {
            renderDescriptor.created.forEach(it => {
                messageQueue.addToQueue(it, "Create", () => renderMessageSend(root, it))
            });
        }
        if (renderDescriptor.changed && renderDescriptor.changed.length > 0) {
            renderDescriptor.changed.forEach(it => {
                messageQueue.addToQueue(it, "Update", () => renderMessageUpdate(root, it))
            });
        }
        if (renderDescriptor.removed && renderDescriptor.removed.length > 0) {
            renderDescriptor.removed.forEach(it => {
                messageQueue.addToQueue(it, "Remove", () => renderMessageRemove(root, it))
            });
            root.messagesToRemove = [];
        }
    }


    apiBot.on("callback_query", (query) => {
        let isAlreadyAnswered = false;
        const answerQuery = (answer: string | CallbackQueryAnswer | undefined) => {
            if (isAlreadyAnswered) return;
            isAlreadyAnswered = true;
            const answerOpts = {} as any;
            if (typeof answer === "string") answerOpts.text = answer;
            else if (typeof answer !== "undefined") {
                answerOpts.text = answer.text;
                answerOpts.show_alert = answer.showAlert;
            }
            apiBot.answerCallbackQuery(query.id, answerOpts)
        }

        const event: RTCallbackQueryEvent = {
            query,
            handled: false,
            answer: answerQuery
        }
        rtDocument.emitCallbackQueryEvent(event);
        if (event.handled) {
            if (!isAlreadyAnswered) answerQuery(undefined);
        } else {
            reactBot.events.emit("callback_query", query)
        }
    })

    apiBot.on("message", (message, metadata) => {
        const event = {message, handled: false};
        rtDocument.messageEvents.emit(String(message.chat.id), event);
        if (!event.handled) {
            reactBot.events.emit("message", message, metadata)
        }
    })

    const rtReconciler = createRTReconciler({
        render: onRender,
        rtDocument
    });

    reactBot.sendJSX = (node: React.ReactNode, chatId: ChatID) => {
        rtReconciler.render(node,  chatId,{reactBot, rtDocument });
    }

    return reactBot;
}