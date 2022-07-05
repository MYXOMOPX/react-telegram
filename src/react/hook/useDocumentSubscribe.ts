import {ISingleEventSubscriptionable} from "../../../type/event-emitter";
import {useEffect} from "react";
import {useLatestCallback} from "./useLatestCallback";


// AFTER IT - DO MESSAGE CONTEXT
// AFFTER - FIX CALLBACK_QUERY EVENTS
// AFTER - DO MESSAGE EVENTS

// U ALREADY DONE OWN_MESSAGE_EVENT (only make subscription for it)

export const useDocumentSubscribe = <EVENT>(
    emitter: ISingleEventSubscriptionable<EVENT>,
    eventName: string | undefined,
    callback: (event: EVENT) => void,
) => {
    const cb = useLatestCallback(callback);

    return useEffect(() => {
        if (!eventName) return;
        emitter.on(eventName, cb)
        return () => { emitter.off(eventName, cb) }
    }, [emitter, eventName])
}