import {IChannelEventEmitter} from "../../../type/channel-event-emitter";
import {RTDocumentEvents, RTMessageEvent, RTMessageEventCallback, RTOwnMessageEvent} from "../../../type/events";
import ChatID = ReactTelegram.ChatID;

type ListenerMap = {
    [key in ChatID]: { // ChatID
        uuid: string,
        callback: RTMessageEventCallback
    }
}

export const createMessageEventManager = (events:  IChannelEventEmitter<RTDocumentEvents>) => {

    const listenerMap = Object.create(null) as ListenerMap;

    const listen = (chatId: ChatID, uuid: string, callback: RTMessageEventCallback) => {
        if (listenerMap[chatId] !== undefined && listenerMap[chatId].uuid !== uuid) {
            events.emit("messageListenerInterrupted", String(chatId), {uuid})
        }
        listenerMap[chatId] = {uuid, callback};
    }

    const stopListen = (chatId: ChatID, uuid: string) => {
        if (listenerMap[chatId] && listenerMap[chatId].uuid === uuid) {
            events.emit("messageListenerInterrupted", String(chatId), {uuid})
        }
        delete listenerMap[chatId]
    }

    const emit = (chatId: ChatID, event: RTMessageEvent) => {
        listenerMap[chatId]?.callback?.call(null, event);
    }

    return {
        listen, stopListen, emit
    }
}