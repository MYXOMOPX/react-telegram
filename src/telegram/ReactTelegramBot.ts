import TelegramBot from "node-telegram-bot-api";
import {createRTReconciler} from "../reconciler";
import {parseMessageForSend, parseMessageForUpdate} from "./node-parser/rtNodeParser";
import {ReactTelegramBot} from "./type";
import {createRTDocument} from "../host/document/RTDocument";
import RTMessageElement = ReactTelegram.RTMessageElement;
import RTRootElement = ReactTelegram.RTRootElement;
import ChatID = ReactTelegram.ChatID;
import {createMessageRenderQueue} from "./MessageRenderQueue";
import {CallbackQueryAnswer, RTCallbackQueryEvent, RTReplyMessageEvent} from "../../type/events";
import {TypedEventEmitter} from "../util";
import {createTelegramApiRenderer} from "./TelegramAPIRenderer";


export const createReactTelegramBot = (apiBot: TelegramBot) => {

    const reactBot = apiBot as ReactTelegramBot;
    const rtDocument = createRTDocument();
    const messageQueue = createMessageRenderQueue();
    const telegramAPIRenderer = createTelegramApiRenderer(reactBot, rtDocument, messageQueue);

    reactBot.events = new TypedEventEmitter();


    const onRender = async (root: RTRootElement, renderDescriptor: ReactTelegram.MessagesToRender) => {
        if (renderDescriptor.created && renderDescriptor.created.length > 0) {
            renderDescriptor.created.forEach(it => {
                if (messageQueue.getCurrentAction(it) === "Create" && messageQueue.isExecuting(it)) {
                    console.log("S-UPDATE",it.uuid);
                    messageQueue.addToQueue(it, "Update", () => telegramAPIRenderer.render_Update(root, it))
                } else {
                    console.log("SENDING",it.uuid);
                    messageQueue.addToQueue(it, "Create", () => telegramAPIRenderer.render_Send(root, it))
                }
            });
        }
        if (renderDescriptor.changed && renderDescriptor.changed.length > 0) {
            renderDescriptor.changed.forEach(it => {
                console.log("N-UPDATE",it.uuid)
                messageQueue.addToQueue(it, "Update", () => telegramAPIRenderer.render_Update(root, it))
            });
        }
        if (renderDescriptor.removed && renderDescriptor.removed.length > 0) {
            renderDescriptor.removed.forEach(it => {
                messageQueue.addToQueue(it, "Remove", () => telegramAPIRenderer.render_Remove(root, it))
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
        const msg = query.message;
        rtDocument.events.emit("callbackQuery", `${msg.chat.id}:${msg.message_id}:${query.data}`, event);
        if (event.handled) {
            if (!isAlreadyAnswered) answerQuery(undefined);
        } else {
            reactBot.events.emit("callback_query", query)
        }
    })

    apiBot.on("message", (message, metadata) => {
        const replyToMsg = message.reply_to_message
        console.log("IN BOT GOT",message.text);
        if (replyToMsg) {
            const replyEvent: RTReplyMessageEvent = {
                message: message,
                handled: false
            }
            rtDocument.events.emit("replyMessage", `${replyToMsg.chat.id}:${replyToMsg.message_id}`, replyEvent);
            if (replyEvent.handled) return;
        }
        console.log("NOT REPLY");

        const event = {message, handled: false};
        rtDocument.emitMessageEvent(message.chat.id, event);
        console.log("NOT HANDLED")
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