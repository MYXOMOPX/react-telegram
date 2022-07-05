import {ReactTelegramBot} from "../../../telegram/type";
import ChatID = ReactTelegram.ChatID;

export interface RootBotContextType {
    reactBot: ReactTelegramBot,
    chatId: ChatID;
    root: ReactTelegram.RTRootElement,
    rtDocument: ReactTelegram.RTDocument
}