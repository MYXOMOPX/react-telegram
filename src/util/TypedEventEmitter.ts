import {EventEmitter} from "events";
import {SingleEventEmitterImpl} from "../../type/event-emitter";

export const TypedSingleEventEmitter = EventEmitter as any as typeof SingleEventEmitterImpl;
