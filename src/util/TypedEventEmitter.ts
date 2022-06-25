import {EventEmitter} from "events";
import {TypedEventEmitterImpl} from "../../type/event-emitter";

export const TypedEventEmitter = EventEmitter as any as typeof TypedEventEmitterImpl;