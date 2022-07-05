import TelegramBot, {CallbackQuery, Message, Metadata} from "node-telegram-bot-api";
import ChatID = ReactTelegram.ChatID;
import {TypedEventEmitterImpl} from "../../type/event-emitter";


interface ReactTelegramBotEvents {
    callback_query: (callbackQuery: CallbackQuery) => void;
    message: (message: Message, metadata: Metadata) => void;
}

export interface ReactTelegramBot extends TelegramBot {
    sendJSX(node: React.ReactNode, chatID: ChatID);

    events: TypedEventEmitterImpl<ReactTelegramBotEvents>
}