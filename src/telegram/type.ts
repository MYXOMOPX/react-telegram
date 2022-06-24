import TelegramBot, {CallbackQuery, Message, Metadata} from "node-telegram-bot-api";
import Emitter from "events";
import {ITypedSubscriptionable} from "../util/TypedEventEmitter";

interface CallbackQueryEvent {
    query: CallbackQuery,
    handled: boolean,
}

type ReactBotEventManager = ITypedSubscriptionable<{
    render: (root: ReactTelegram.RTRootElement) => Promise<void>;
    callbackQuery: (event: CallbackQueryEvent) => void,
}>

export interface ReactTelegramBot extends TelegramBot {
    sendJSX(node: React.ReactNode);
}

export interface ReconcilerOpts {
    handleRender: (root: ReactTelegram.RTRootElement) => Promise<void>;

}