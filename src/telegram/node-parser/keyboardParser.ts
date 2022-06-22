import RTInlineKeyboardElement = ReactTelegram.RTInlineKeyboardElement;
import {InlineKeyboardButton, InlineKeyboardMarkup} from "node-telegram-bot-api";
import RTInlineKeyboardButtonElement = ReactTelegram.RTInlineKeyboardButtonElement;


export const parseKeyboard = (element: RTInlineKeyboardElement): InlineKeyboardButton[][] => {
    const hasColumns = (element.data.columns || 0) > 0;
    const children = element.children;
    if (hasColumns) {
        return [children.map(it => parseButton(it as RTInlineKeyboardButtonElement))]
    }
    const columns: InlineKeyboardButton[][] = [];
    for (let i = 0; i < children.length; i++) {
        const button = parseButton(children[0] as RTInlineKeyboardButtonElement);

        const lastRowI = columns.length - 1;
        const lastRowLen = columns.length && columns[lastRowI].length;
        if (columns.length === 0 || lastRowLen === 4) {
            columns.push([button]);
            continue;
        }
        columns[lastRowI].push(button)
    }
    return columns;
}

const parseButton = (element: RTInlineKeyboardButtonElement): InlineKeyboardButton => {
    return element.data;
}