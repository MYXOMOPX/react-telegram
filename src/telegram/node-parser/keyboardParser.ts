import {InlineKeyboardButton, InlineKeyboardMarkup} from "node-telegram-bot-api";
import RTInlineKeyboardElement = ReactTelegram.RTInlineKeyboardElement;
import RTElement = ReactTelegram.RTElement;

export const parseKeyboardInMessage = (element: ReactTelegram.RTMessageElement): InlineKeyboardMarkup | undefined => {
    const children = element.children;
    const kb = children.find(it => it.type === "element" && (it as RTElement).elementName === "inline-keyboard");
    if (kb === undefined) return undefined;
    return parseKeyboard(kb as RTInlineKeyboardElement);
}

const parseKeyboard = (element: RTInlineKeyboardElement): InlineKeyboardMarkup => {
    const children = element.children;

    return {
        inline_keyboard: children.map(parseKeyboardChild).filter(it => it !== null)
    }
}

const parseKeyboardChild = (
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