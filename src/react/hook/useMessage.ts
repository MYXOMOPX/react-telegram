import {useLatestCallback} from "./useLatestCallback";
import {useContext, useEffect} from "react";
import {RootBotContext} from "../context/RootBotContext/RootBotContext";
import {Message} from "node-telegram-bot-api";
import {ReactTelegramBot} from "../../telegram/type";
import RTMessageEvent = ReactTelegram.RTMessageEvent;

export type UseMessageCallback = (message: Message, bot: ReactTelegramBot) => void;

export const useMessage = (callback: UseMessageCallback, listening: boolean) => {
    const cb = useLatestCallback(callback);
    const { rtDocument, chatId, reactBot } = useContext(RootBotContext);

    useEffect(() => {
        if (!listening) return;
        const strChatId = String(chatId);
        const listener = (event: RTMessageEvent) => {
            event.handled = true;
            cb(event.message, reactBot)
        }
        rtDocument.messageEvents.on(strChatId, listener)
        return () => {
            rtDocument.messageEvents.off(strChatId, listener)
        }
    }, [listening])
}