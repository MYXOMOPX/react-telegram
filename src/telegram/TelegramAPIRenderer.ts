import {parseMessageForSend, parseMessageForUpdate} from "./node-parser/rtNodeParser";
import RTRootElement = ReactTelegram.RTRootElement;
import RTMessageElement = ReactTelegram.RTMessageElement;
import {MessageRenderQueue} from "./MessageRenderQueue";
import {ReactTelegramBot} from "./type";
import RTDocument = ReactTelegram.RTDocument;


const isIgnorableError = (error) => {
    return error.response.statusCode === 400 && error.response.body.description.includes("message content and reply markup are exactly the same");
}

export const createTelegramApiRenderer = (bot: ReactTelegramBot, rtDocument: RTDocument, messageQueue: MessageRenderQueue) => {


    const render_Send = async (root: RTRootElement, message: RTMessageElement) => {
        message.rerenderStatus = "Parsing";
        const msgForSend = await parseMessageForSend(message);
        if (messageQueue.isActionQueued(message)) return;
        message.rerenderStatus = "Sending";
        if (msgForSend.type === "text") {
            const msg = await bot.sendMessage(root.chatId, msgForSend.text, {
                parse_mode: "HTML",
                reply_markup: msgForSend.reply_markup
            });
            message.messageId = msg.message_id;
            rtDocument.events.emit("ownMessage", message.uuid, {
                message: msg,
                messageUuid: message.uuid
            })
        }
        message.rerenderStatus = "None";
    }

    const render_Update = async (root: RTRootElement, message: RTMessageElement) => {
        message.rerenderStatus = "Parsing";
        const msgForUpdate = await parseMessageForUpdate(message);
        if (messageQueue.isActionQueued(message)) return;
        message.rerenderStatus = "Sending";
        if (msgForUpdate.type === "text") {
            try {
                await bot.editMessageText(msgForUpdate.text, {
                    parse_mode: "HTML",
                    chat_id: root.chatId,
                    message_id: message.messageId,
                    reply_markup: msgForUpdate.reply_markup
                })
            } catch (err) {
                if (! isIgnorableError(err)) throw err;
            }

        }
        message.rerenderStatus = "None";
    }

    const render_Remove = async (root: RTRootElement, message: RTMessageElement) => {
        if (!message.messageId) return;
        message.rerenderStatus = "Removing"
        await bot.deleteMessage(root.chatId, String(message.messageId))
        message.rerenderStatus = "None"
    }

    return {
        render_Send, render_Update, render_Remove
    }
}