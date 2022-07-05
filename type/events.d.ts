/**
 * eventName on emit:  chatId:messageId:callbackData
 */
export interface CallbackQueryAnswer {
    text?: string;
    showAlert?: boolean;
}

export type CallbackQueryAnswerFunction = (answer: string | CallbackQueryAnswer) => void;

export interface RTCallbackQueryEvent {
    query: import("node-telegram-bot-api").CallbackQuery,
    answer: CallbackQueryAnswerFunction,
    handled: boolean;
}

/**
 * eventName on emit: chatId
 */
export interface RTMessageEvent {
    message: import("node-telegram-bot-api").Message,
    handled: any, // TODO
}

/**
 * eventName on emit: messageUUID
 */
export interface RTOwnMessageEvent {
    message: import("node-telegram-bot-api").Message,
    messageUuid: string;
}