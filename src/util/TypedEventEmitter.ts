import {EventEmitter} from "events";
import {SingleEventEmitterImpl, TypedEventEmitterImpl} from "../../type/event-emitter";

export const TypedSingleEventEmitter = EventEmitter as any as typeof SingleEventEmitterImpl;
export const TypedEventEmitter = EventEmitter as any as typeof TypedEventEmitterImpl;
