import TelegramBot from "node-telegram-bot-api";
import {createRTReconciler} from "../reconciler";
import RTMessageRootElement = ReactTelegram.RTMessageRootElement;
import {parseMessageForSend, parseMessageForUpdate} from "./node-parser/rtNodeParser";

export interface ReactTelegramBot extends TelegramBot {
    sendJSX(node: React.ReactNode, chatId: TelegramBot.ChatId);
}

export const createReactTelegramBot = (apiBot: TelegramBot) => {

    const reactBot = apiBot as ReactTelegramBot;

    const onRender = async (container: RTMessageRootElement) => {
        if (container.data.messageId) {
            const msgForUpdate = parseMessageForUpdate(container);
            if (msgForUpdate.type === "text") {
                apiBot.editMessageText(msgForUpdate.text, {
                    parse_mode: "HTML",
                    chat_id: container.data.chatId,
                    message_id: container.data.messageId,
                })
            }
        } else {
            const msgForSend = parseMessageForSend(container);
            if (msgForSend.type === "text") {
                const msg = await apiBot.sendMessage(container.data.chatId, msgForSend.text, {
                    parse_mode: "HTML"
                });
                container.data.messageId = msg.message_id;
            }
        }
    }

    const rtReconciler = createRTReconciler(onRender);

    reactBot.sendJSX = (node: React.ReactNode, chatId: TelegramBot.ChatId) => {
        rtReconciler.render(node, chatId);
    }

    return reactBot;
}