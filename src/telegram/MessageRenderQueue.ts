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

export type MessageRenderQueue = ReturnType<typeof createMessageRenderQueue>;

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

    const getCurrentAction = (message: RTMessageElement): QueueAction | undefined => {
        return queueMap.get(message)?.current?.action
    }

    const getQueuedAction = (message: RTMessageElement): QueueAction | undefined => {
        return queueMap.get(message)?.queued?.action
    }

    const isExecuting = (message: RTMessageElement): boolean => {
        return queueMap.get(message)?.current?.isRunning === true;
    }

    const isActionQueued = (message: RTMessageElement): boolean => {
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
        const currAction = getCurrentAction(message);
        if (queuedAction === "Remove" || currAction === "Remove") return;

        if (queueDescriptor.current === undefined || (!queueDescriptor.current.isRunning && queueDescriptor.queued === undefined)) {
            const wasEmpty = queueDescriptor.current === undefined;
            queueDescriptor.current = {action, callback, isRunning: false};
            if (wasEmpty) deferredRun(() => processQueueAction(message));
        } else {
            queueDescriptor.queued = {action, callback};
        }
    }


    return {
        addToQueue,
        getCurrentAction,
        getQueuedAction,
        isActionQueued,
        isExecuting
    }
}