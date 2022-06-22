import RTMessageRootElement = ReactTelegram.RTMessageRootElement;
import {InlineKeyboardMarkup, SendMessageOptions} from "node-telegram-bot-api";
import ReactTelegramMessageType = ReactTelegram.ReactTelegramMessageType;
import {parseTextInsideElement} from "./textParser";

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

export const parseMessageForSend = (root: RTMessageRootElement): MessageForSend => {

    const children = root.children;
    const isMedia = false; //children.filter(it => it.type === "element")



    if (!isMedia) {
        const text = parseTextInsideElement(root);
        return {
            type: "text",
            text,
        }
    }
    throw new Error("Media messages not implemented yet");
}

export const parseMessageForUpdate = (root: RTMessageRootElement): MessageForSend => {

    const children = root.children;
    const isMedia = false;
    if (!isMedia) {
        const text = parseTextInsideElement(root);
        return {
            type: "text",
            text,
        }
    }
    throw new Error("Media messages not implemented yet");
}