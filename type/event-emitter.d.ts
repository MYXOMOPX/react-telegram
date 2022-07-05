// export interface ITypedSubscriptionable<T> {
//     addListener<E extends keyof T>(event: E, listener: T[E]): this;
//     // listenerCount<E extends keyof T>(event: E): number;
//     listeners<E extends keyof T>(event: E): Function[];
//     off<E extends keyof T>(event: E, listener: T[E]): this;
//     on<E extends keyof T>(event: E, listener: T[E]): this;
//     once<E extends keyof T>(event: E, listener: T[E]): this;
//     prependListener<E extends keyof T>(event: E, listener: T[E]): this;
//     prependOnceListener<E extends keyof T>(event: E, listener: T[E]): this;
//     removeAllListeners<E extends keyof T>(event: E): this;
//     removeListener<E extends keyof T>(event: E, listener: T[E]): this;
// }
//
// export interface ITypedEmittable<T> {
//     emit<E extends keyof T>(event: E, ...args: [T[E]] extends [((...args: infer U) => any)] ? U : ([T[E]] extends [void] ? [] : [T[E]])): boolean;
// }
//
// export interface ITypedEventManager<T> {
//     eventNames(): (keyof T)[];
//     getMaxListeners(): number;
//     setMaxListeners(maxListeners: number): this;
// }
//
// declare class TypedEventEmitterImpl<T> implements ITypedSubscriptionable<T>, ITypedEmittable<T>, ITypedEventManager<T>{
//     emit<E extends keyof T>(event: E, ...args: [T[E]] extends [((...args: infer U) => any)] ? U : ([T[E]] extends [void] ? [] : [T[E]])): boolean;
//
//     addListener<E extends keyof T>(event: E, listener: T[E]): this;
//     eventNames(): (keyof T)[];
//     getMaxListeners(): number;
//     // listenerCount<E extends keyof T>(event: E): number;
//     listeners<E extends keyof T>(event: E): Function[];
//     off<E extends keyof T>(event: E, listener: T[E]): this;
//     on<E extends keyof T>(event: E, listener: T[E]): this;
//     once<E extends keyof T>(event: E, listener: T[E]): this;
//     prependListener<E extends keyof T>(event: E, listener: T[E]): this;
//     prependOnceListener<E extends keyof T>(event: E, listener: T[E]): this;
//     removeAllListeners<E extends keyof T>(event: E): this;
//     removeListener<E extends keyof T>(event: E, listener: T[E]): this;
//     setMaxListeners(maxListeners: number): this;
// }

export type TypedEventListener<E> = (event: E) => void;

export interface ISingleEventSubscriptionable<E> {
    addListener(event: string, listener: TypedEventListener<E>): this;
    // listenerCount<E extends keyof T>(event: E): number;
    listeners(event: string): Function[];
    off(event: string, listener: TypedEventListener<E>): this;
    on(event: string, listener: TypedEventListener<E>): this;
    once(event: string, listener: TypedEventListener<E>): this;
    prependListener(event: string, listener: TypedEventListener<E>): this;
    prependOnceListener(event: string, listener: TypedEventListener<E>): this;
    removeAllListeners(event: string): this;
    removeListener(event: string, listener: TypedEventListener<E>): this;
}

export interface ISingleEventEmittable<E> {
    emit(eventName: string, event: E): boolean;
}

export interface ISingleEventManager {
    eventNames(): string;
    getMaxListeners(): number;
    setMaxListeners(maxListeners: number): this;
}

declare class SingleEventEmitterImpl<E> implements ISingleEventSubscriptionable<E>, ISingleEventEmittable<E>, ISingleEventManager{
    emit(eventName: string, event: E): boolean;

    addListener(event: string, listener: TypedEventListener<E>): this;
    // listenerCount<E extends keyof T>(event: E): number;
    listeners(event: string): Function[];
    off(event: string, listener: TypedEventListener<E>): this;
    on(event: string, listener: TypedEventListener<E>): this;
    once(event: string, listener: TypedEventListener<E>): this;
    prependListener(event: string, listener: TypedEventListener<E>): this;
    prependOnceListener(event: string, listener: TypedEventListener<E>): this;
    removeAllListeners(event: string): this;
    removeListener(event: string, listener: TypedEventListener<E>): this;
    setMaxListeners(maxListeners: number): this;

    eventNames(): string;
    getMaxListeners(): number;
    setMaxListeners(maxListeners: number): this;
}