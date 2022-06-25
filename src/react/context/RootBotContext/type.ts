import {ReactTelegramBot} from "../../../telegram/type";
import ITypedSubscriptionable = ReactTelegram.ITypedSubscriptionable;
import RootEvents = ReactTelegram.RootEvents;

export interface RootBotContextType {
    reactBot: ReactTelegramBot,
    root: ReactTelegram.RTRootElement,
    events: ITypedSubscriptionable<RootEvents>
}