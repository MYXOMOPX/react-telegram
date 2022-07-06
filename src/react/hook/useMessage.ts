import {Message} from "node-telegram-bot-api";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {useLatestCallback} from "./useLatestCallback";
import {RootBotContext} from "../context/RootBotContext/RootBotContext";
import {ReactTelegramBot} from "../../telegram/type";
import {useDocumentSubscribe} from "./useDocumentSubscribe";

export type UseMessageCallback = (event: Message, bot: ReactTelegramBot, stopListen: () => void) => boolean;

type UseMessageReturn = [() => void, boolean, () => void];

export const useMessage = (callback: UseMessageCallback, listeningByDefault: boolean = false): UseMessageReturn => {
    const cb = useLatestCallback(callback);
    const listenerUuid = useRef(uuidv4());

    const [listening, setListening] = useState(listeningByDefault);

    const { rtDocument, chatId, reactBot } = useContext(RootBotContext);

    const stopListen = useCallback(() => {
      rtDocument.stopListenForMessage(chatId, listenerUuid.current);
    },[])

    const startListen = useCallback(() => {
        if (listening) return;
        rtDocument.listenForMessage(chatId, listenerUuid.current, (event) => {
            event.handled = cb(event.message, reactBot, stopListen);
        });
        setListening(true);
    }, []);

    useEffect(() => {
        if (listeningByDefault) startListen();
    }, []);

    useDocumentSubscribe("messageListenerInterrupted", String(chatId), () => {
        setListening(false);
    })

    return [startListen, listening, stopListen];
}