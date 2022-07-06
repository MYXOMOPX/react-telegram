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

export interface RTReplyMessageEvent {
    message: import("node-telegram-bot-api").Message,
    handled: any, // TODO
}

export interface RTOwnMessageEvent {
    message: import("node-telegram-bot-api").Message,
    messageUuid: string;
}

export interface RTMessageListenerInterruptedEvent {
    uuid: string;
}

export type RTMessageEventCallback = (event: RTMessageEvent) =>  void;

export interface RTMessageEvent {
    message: import("node-telegram-bot-api").Message,
    handled: any, // TODO
}

export interface RTDocumentEvents {
    "callbackQuery": (event: RTCallbackQueryEvent) => void; // channels: ${msg.chat.id}:${msg.message_id}:${query.data}
    "ownMessage": (event: RTOwnMessageEvent) => void; // channels: messageUuid
    "replyMessage": (event: RTReplyMessageEvent) => void; // channels: ${chatId}:${messageId}
    "messageListenerInterrupted": (event: RTMessageListenerInterruptedEvent) => void; // channels: ${chatId}
}