import {InlineKeyboardButton, InlineKeyboardMarkup} from "node-telegram-bot-api";
import RTInlineKeyboardElement = ReactTelegram.RTReplyMarkupElement;
import RTElement = ReactTelegram.RTElement;

export const parseReplyMarkupInMessage = (element: ReactTelegram.RTMessageElement): InlineKeyboardMarkup | undefined => {
    const children = element.children;
    const kb = children.find(it => it.type === "element" && (it as RTElement).elementName === "reply-markup");
    if (kb === undefined) return undefined;
    console.log("###KB", (kb as RTInlineKeyboardElement).children[0]);
    return parseInlineKeyboard(kb as RTInlineKeyboardElement);
}

const parseInlineKeyboard = (element: RTInlineKeyboardElement): InlineKeyboardMarkup => {
    const children = element.children;

    return {
        inline_keyboard: children.map(parseInlineKeyboardChild).filter(it => it !== null)
    }
}

const parseInlineKeyboardChild = (
    element: RTElement
): InlineKeyboardButton[] | null => {
    if (element.elementName === "inline-keyboard-button") {
        return [element.data]
    } else if (element.elementName === "inline-keyboard-row") {
        return element.children.map(it => (it as RTElement).data);
    } else {
        return null
    }
}