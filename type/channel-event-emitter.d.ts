export interface IChannelEventEmitter<T> {
    // listenerCount<E extends keyof T>(event: E): number;
    off<E extends keyof T>(event: E, channel: string, listener: T[E]): this;
    on<E extends keyof T>(event: E, channel: string, listener: T[E]): this;
    emit<E extends keyof T>(event: E, channel: string, ...args: [T[E]] extends [((...args: infer U) => any)] ? U : ([T[E]] extends [void] ? [] : [T[E]])): boolean;
}