import {InlineKeyboardMarkup } from "node-telegram-bot-api";
import ReactTelegramMessageType = ReactTelegram.ReactTelegramMessageType;
import {parseTextInsideElement} from "./textParser";
import {parseKeyboardInMessage} from "./keyboardParser";

interface BasicMessageData {
    type: ReactTelegramMessageType
    reply_markup?: InlineKeyboardMarkup
}

interface MessageForSendText extends BasicMessageData {
    type: "text";
    text: string;
}

interface MessageForSendMedia extends BasicMessageData {
    type: "photo" | "audio",
    data: any;
}

type MessageForSend = MessageForSendText | MessageForSendMedia

export const parseMessageForSend = async (messageNode: ReactTelegram.RTMessageElement): Promise<MessageForSend> => {

    const children = messageNode.children;
    const isMedia = false; //children.filter(it => it.type === "element")

    const replyMarkup = parseKeyboardInMessage(messageNode);

    if (!isMedia) {
        const text = parseTextInsideElement(messageNode);
        return {
            type: "text",
            text,
            reply_markup: replyMarkup
        }
    }
    throw new Error("Media messages not implemented yet");
}

export const parseMessageForUpdate = async (messageNode: ReactTelegram.RTMessageElement): Promise<MessageForSend> => {

    const children = messageNode.children;
    const isMedia = false; //children.filter(it => it.type === "element")

    const replyMarkup = parseKeyboardInMessage(messageNode);

    if (!isMedia) {
        const text = parseTextInsideElement(messageNode);
        return {
            type: "text",
            text,
            reply_markup: replyMarkup
        }
    }
    throw new Error("Media messages not implemented yet");
}