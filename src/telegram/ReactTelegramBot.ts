import TelegramBot from "node-telegram-bot-api";
import {createRTReconciler} from "../reconciler";
import {parseMessageForSend, parseMessageForUpdate} from "./node-parser/rtNodeParser";
import {ReactTelegramBot} from "./type";
import {createRTDocument} from "../host/document/RTDocument";
import RTMessageElement = ReactTelegram.RTMessageElement;
import RTRootElement = ReactTelegram.RTRootElement;
import {TypedEventEmitter} from "../util/TypedEventEmitter";
import RootEvents = ReactTelegram.RootEvents;
import ChatID = ReactTelegram.ChatID;
import {CallbackQueryEvent} from "../../type/events";
import {TypedEventEmitterImpl} from "../../type/event-emitter";


export const createReactTelegramBot = (apiBot: TelegramBot) => {

    const reactBot = apiBot as ReactTelegramBot;
    const rtDocument = createRTDocument();

    const renderMessageSend = async (root: RTRootElement, message: RTMessageElement) => {
        message.rerenderStatus = "Parsing";
        const msgForSend = await parseMessageForSend(message);
        message.rerenderStatus = "Sending";
        if (msgForSend.type === "text") {
            console.log("PARSED",msgForSend);
            const msg = await apiBot.sendMessage(root.chatId, msgForSend.text, {
                parse_mode: "HTML",
                reply_markup: msgForSend.reply_markup
            });
            message.messageId = msg.message_id;
            // emit event about messageId changed
        }
        message.rerenderStatus = "None";
    }

    const renderMessageUpdate = async (root: RTRootElement, message: RTMessageElement) => {
        console.log("UPDATE");
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

    // Race conditions (only 1 in queue)
    const renderMessage = async (root: RTRootElement, message: RTMessageElement) => {
        // if (!message.data.) {
        //     console.warn("Found message without chat_id. It can't be sent")
        //     throw new Error("Found message without chat_id. It can't be sent");
        // }
        message.isChanged = false;
        if (message.messageId) {
            await renderMessageUpdate(root, message)
        } else {
            await renderMessageSend(root, message)
        }
    }

    const onRender = async (root: RTRootElement, messages: Array<RTMessageElement>) => {
        messages.forEach(msg => renderMessage(root, msg))
    }


    apiBot.on("callback_query", (query) => {
        const root = rtDocument.getRootsByMessage(query.message.chat.id, query.message.message_id);
        const event: CallbackQueryEvent = {
            query,
            handled: false,
        }
        if (root) {
            (root.events as TypedEventEmitterImpl<RootEvents>).emit("callbackQuery", event);
        }
        if (event.handled) {
            apiBot.answerCallbackQuery(query.id, {
                text: event?.answer?.text,
                show_alert: event?.answer?.showAlert
            });
        }
        // emit other event (NOT IN ROOT)
    })

    const rtReconciler = createRTReconciler({
        render: onRender,
        rtDocument
    });

    reactBot.sendJSX = (node: React.ReactNode, chatId: ChatID) => {
        const events = new TypedEventEmitter();
        rtReconciler.render(node,  chatId,{reactBot, events });
    }

    return reactBot;
}