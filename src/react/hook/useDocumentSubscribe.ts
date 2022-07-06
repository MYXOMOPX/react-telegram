import {ISingleEventSubscriptionable} from "../../../type/event-emitter";
import {useContext, useEffect} from "react";
import {useLatestCallback} from "./useLatestCallback";
import RTDocumentEvents = ReactTelegram.RTDocumentEvents;
import {RootBotContext} from "../context/RootBotContext/RootBotContext";


// AFTER IT - DO MESSAGE CONTEXT
// AFFTER - FIX CALLBACK_QUERY EVENTS
// AFTER - DO MESSAGE EVENTS

// U ALREADY DONE OWN_MESSAGE_EVENT (only make subscription for it)

export const useDocumentSubscribe = <T extends keyof RTDocumentEvents>(
    eventName: T,
    channel: string,
    callback: RTDocumentEvents[T]
) => {
    const cb = useLatestCallback(callback);
    const { rtDocument } = useContext(RootBotContext);

    return useEffect(() => {
        if (!eventName) return;
        rtDocument.events.on(eventName, channel, cb);
        return () => { rtDocument.events.off(eventName, channel, cb) }
    }, [eventName, channel])
}