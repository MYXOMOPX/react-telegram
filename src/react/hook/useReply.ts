import {useDocumentSubscribe} from "./useDocumentSubscribe";
import {getEventChannelForReply} from "../../util";
import {useContext} from "react";
import {RootBotContext} from "../context/RootBotContext/RootBotContext";
import {MessageContext} from "../component";
import {Message} from "node-telegram-bot-api";
import {useLatestCallback} from "./useLatestCallback";

type UseReplyCallback = (message: Message) => void;

export const useReply = (callback: UseReplyCallback) => {
    const cb = useLatestCallback(callback);

    const {chatId} = useContext(RootBotContext);
    const {messageId} = useContext(MessageContext);

    useDocumentSubscribe(
        "replyMessage",
        getEventChannelForReply(chatId, messageId),
        (event) => cb(event.message)
    );
}