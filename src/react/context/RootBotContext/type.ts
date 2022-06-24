import {ReactTelegramBot} from "../../../telegram/type";

export interface RootBotContextType {
    reactBot: ReactTelegramBot,
    root: ReactTelegram.RTRootElement,
    events: any,
}