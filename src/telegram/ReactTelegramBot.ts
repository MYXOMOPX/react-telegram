import TelegramBot from "node-telegram-bot-api";
import {createRTReconciler} from "../reconciler";
import RTMessageRootElement = ReactTelegram.RTRootElement;
import {parseMessageForSend, parseMessageForUpdate} from "./node-parser/rtNodeParser";
import {ReactTelegramBot} from "./type";
import {createRTDocument} from "../host/document/RTDocument";


export const createReactTelegramBot = (apiBot: TelegramBot) => {

    const reactBot = apiBot as ReactTelegramBot;
    const document = createRTDocument();

    // Race conditions (only 1 in queue)
    const onRender = async (container: RTMessageRootElement) => {
        if (container.data.messageId) {
            const msgForUpdate = parseMessageForUpdate(container);
            if (msgForUpdate.type === "text") {
                apiBot.editMessageText(msgForUpdate.text, {
                    parse_mode: "HTML",
                    chat_id: container.data.chatId,
                    message_id: container.data.messageId,
                    reply_markup: msgForUpdate.reply_markup
                })
            }
        } else {
            const msgForSend = parseMessageForSend(container);
            if (msgForSend.type === "text") {
                const msg = await apiBot.sendMessage(container.data.chatId, msgForSend.text, {
                    parse_mode: "HTML",
                    reply_markup: msgForSend.reply_markup
                });
                container.data.messageId = msg.message_id;
                // emit event about messageId changed
            }
        }
    }


    apiBot.on("callback_query", (a) => {
        const event = {query: a};
        emitter.emit("callbackquery", event);
    })
    const rtReconciler = createRTReconciler(onRender);

    // need channels for eventEmitter | or new emitter for every root
    const roots: Array<RTMessageRootElement> = [];
    reactBot.sendJSX = (node: React.ReactNode, chatId: TelegramBot.ChatId) => {
        roots.push((rtReconciler.render(node, chatId));
    }

    return reactBot;
}