
/// <reference types="node-telegram-bot-api" />

interface CallbackQueryEvent {
    query: import("node-telegram-bot-api").CallbackQuery,
    handled: boolean,
    answer?: {
        text?: string;
        showAlert?: boolean;
    };
}

export type RootEvents = {
    callbackQuery: (event: CallbackQueryEvent) => void,
}