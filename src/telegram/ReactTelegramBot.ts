import TelegramBot from "node-telegram-bot-api";
import {createRTReconciler} from "../reconciler";
import {parseMessageForSend, parseMessageForUpdate} from "./node-parser/rtNodeParser";
import {ReactTelegramBot} from "./type";
import {createRTDocument} from "../host/document/RTDocument";
import RTMessageElement = ReactTelegram.RTMessageElement;
import RTRootElement = ReactTelegram.RTRootElement;


export const createReactTelegramBot = (apiBot: TelegramBot) => {

    const reactBot = apiBot as ReactTelegramBot;
    const rtDocument = createRTDocument();

    const renderMessageSend = async (message: RTMessageElement) => {
        message.rerenderStatus = "Parsing";
        console.log("SEND",message);
        const msgForSend = await parseMessageForSend(message);
        message.rerenderStatus = "Sending";
        if (msgForSend.type === "text") {
            console.log("PARSED",msgForSend);
            const msg = await apiBot.sendMessage(message.data.chat_id, msgForSend.text, {
                parse_mode: "HTML",
                reply_markup: msgForSend.reply_markup
            });
            message.messageId = msg.message_id;
            // emit event about messageId changed
        }
        message.rerenderStatus = "None";
    }

    const renderMessageUpdate = async (message: RTMessageElement) => {
        console.log("UPDATE");
        message.rerenderStatus = "Parsing";
        const msgForUpdate = await parseMessageForUpdate(message);
        message.rerenderStatus = "Sending";
        if (msgForUpdate.type === "text") {
            await apiBot.editMessageText(msgForUpdate.text, {
                parse_mode: "HTML",
                chat_id: message.data.chat_id,
                message_id: message.messageId,
                reply_markup: msgForUpdate.reply_markup
            })
        }
        message.rerenderStatus = "None";
    }

    // Race conditions (only 1 in queue)
    const renderMessage = async (message: RTMessageElement) => {
        if (!message.data.chat_id) {
            console.warn("Found message without chat_id. It can't be sent")
            throw new Error("Found message without chat_id. It can't be sent");
        }
        message.isChanged = false;
        if (message.messageId) {
            await renderMessageUpdate(message)
        } else {
            await renderMessageSend(message)
        }
    }

    const onRender = async (root: RTRootElement, messages: Array<RTMessageElement>) => {
        console.log("ON RENDER");
        console.log(messages);
        messages.forEach(renderMessage)
    }


    // apiBot.on("callback_query", (a) => {
    //     const event = {query: a};
    //     emitter.emit("callbackquery", event);
    // })
    const rtReconciler = createRTReconciler({
        render: onRender,
        rtDocument
    });

    reactBot.sendJSX = (node: React.ReactNode) => {
        rtReconciler.render(node, {reactBot, events: null});
    }

    return reactBot;
}