import {IChannelEventEmitter} from "../../type/channel-event-emitter";


type EventMap<T> = {
    [K in keyof T]: {
        [key: string]: Array<T[K]>
    }
}

export const createChannelEventEmitter = <T>(): IChannelEventEmitter<T> => {
    const eventMap: EventMap<T> = {} as any;

    const emitter = {} as IChannelEventEmitter<T>;

    emitter.on = <E extends keyof T>(event: E, channel: string, listener: T[E]) => {
        if (eventMap[event] === undefined) eventMap[event] = {};
        if (eventMap[event][channel] === undefined) (eventMap[event] as any)[channel] = []
        eventMap[event][channel].push(listener);
        return emitter;
    }

    emitter.off = <E extends keyof T>(event: E, channel: string, listener: T[E]) => {
        if (eventMap[event] === undefined) return emitter;
        if (eventMap[event][channel] === undefined) return emitter;
        const index = eventMap[event][channel].indexOf(listener);
        eventMap[event][channel].splice(index, 1);
        return emitter;
    }

    emitter.emit = <E extends keyof T>(event: E, channel: string, ...args: [T[E]] extends [((...args: infer U) => any)] ? U : ([T[E]] extends [void] ? [] : [T[E]])) => {
        const listeners = eventMap[event]?.[channel];
        if (!listeners || !listeners.length) return false;
        for(let i = 0; i < listeners.length; i++) {
            const cb = listeners[i] as any;
            (cb as Function).call(null, ...args);
        }
        return true;
    }

    return emitter;
}