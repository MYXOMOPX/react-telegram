import RTMessageElement = ReactTelegram.RTMessageElement;
import RTMessageRenderStatus = ReactTelegram.RTMessageRenderStatus;

export type QueueAction =
    | "Create"
    | "Update"
    | "Remove"
;

export const createMessageRenderQueue = () => {

    const queueMap = new WeakMap<RTMessageElement, {
        current?: {
            action: QueueAction,
            callback: () => Promise<void>
        }
        queued?: {
            action: QueueAction,
            callback: () => Promise<void>
        }

    }>();

    const processQueueAction = async (message: RTMessageElement) => {
        const descriptor = queueMap.get(message);

        while (descriptor.current !== undefined) {
            await descriptor.current.callback();
            descriptor.current = descriptor.queued;
            descriptor.queued = undefined;
        }
    }

    const getQueuedAction = (message: RTMessageElement): QueueAction | undefined => {
        return queueMap.get(message)?.queued?.action
    }

    const isInQueue = (message: RTMessageElement): boolean => {
        return getQueuedAction(message) !== undefined;
    }

    const addToQueue = (
        message: RTMessageElement,
        action: QueueAction,
        callback: () => Promise<void>
    ) => {
        if (!queueMap.has(message)) queueMap.set(message, {})
        const queueDescriptor = queueMap.get(message);

        const queuedAction = getQueuedAction(message);

        if (queuedAction === undefined) {
            queueDescriptor.current = {action, callback};
            processQueueAction(message);
        } else {
            if (queuedAction === "Remove") return;
            queueDescriptor.queued = {action, callback};
        }
    }


    return {
        addToQueue,
        isInQueue,
        getQueuedStatus: getQueuedAction
    }
}