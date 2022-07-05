import RTMessageElement = ReactTelegram.RTMessageElement;

export type QueueAction =
    | "Create"
    | "Update"
    | "Remove"
;


const deferredRun = <T>(fn: () => Promise<T>): Promise<T> => {
    return new Promise(resolve => {
        setImmediate(async () => {
            const result = await fn();
            resolve(result);
        })
    });
}

export const createMessageRenderQueue = () => {

    const queueMap = new WeakMap<RTMessageElement, {
        current?: {
            action: QueueAction,
            callback: () => Promise<void>,
            isRunning: boolean;
        }
        queued?: {
            action: QueueAction,
            callback: () => Promise<void>
        }

    }>();


    const processQueueAction = async (message: RTMessageElement) => {
        const descriptor = queueMap.get(message);

        while (descriptor.current !== undefined) {
            descriptor.current.isRunning = true;
            await descriptor.current.callback();
            descriptor.current = descriptor.queued ? { ...descriptor.queued, isRunning: false } : undefined;
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

        if (queueDescriptor.current === undefined || (!queueDescriptor.current.isRunning && queueDescriptor.queued === undefined)) {
            const wasEmpty = queueDescriptor.current === undefined;
            queueDescriptor.current = {action, callback, isRunning: false};
            if (wasEmpty) deferredRun(() => processQueueAction(message));
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