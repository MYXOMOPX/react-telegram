type HostContext = any;
type Type = ReactTelegram.ElementName;
type Data = any
type Container = ReactTelegram.RTRootElement;
type Instance = ReactTelegram.RTElement;
type TextInstance = ReactTelegram.RawTextNode;
type UpdatePayload = any;

// Typings for methods used in example renderer
// Source: https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMHostConfig.js

export type ReconcilerRTHostConfig = {
    supportsMutation?: boolean;

    shouldSetTextContent?(type: string, data: Data): boolean;

    createInstance?(
        type: Type,
        data: Data,
        rootContainerInstance: Container,
        hostContext: HostContext,
        internalInstanceHandle: Object
    ): Instance;

    createTextInstance?(
        text: string,
        rootContainerInstance: Container,
        hostContext: HostContext,
        internalInstanceHandle: Object
    ): TextInstance;

    appendInitialChild?(
        parentInstance: Instance,
        child: Instance | TextInstance
    ): void;

    appendChildToContainer?(
        container: Container,
        child: Instance | TextInstance
    ): void;

    prepareUpdate?(
        domElement: Instance,
        type: Type,
        oldData: Data,
        newData: Data,
        rootContainerInstance: Container,
        hostContext: HostContext
    ): null | UpdatePayload;

    commitUpdate?(
        domElement: Instance,
        updatePayload: UpdatePayload,
        type: Type,
        oldData: Data,
        newData: Data,
        internalInstanceHandle: Object
    ): void;

    clearContainer?(
        container: Container
    ): void;

    appendChild?(
        parentInstance: Instance,
        child: Instance | TextInstance
    ): void;

    insertBefore?(
        parentInstance: Instance,
        child: Instance | TextInstance,
        beforeChild: Instance | TextInstance
    ): void;

    insertInContainerBefore?(
        container: Container,
        child: Instance | TextInstance,
        beforeChild: Instance | TextInstance
    ): void;

    removeChild?(
        parentInstance: Instance,
        child: Instance | TextInstance
    ): void;

    removeChildFromContainer?(
        container: Container,
        child: Instance | TextInstance
    ): void;

    commitTextUpdate?(
        textInstance: TextInstance,
        oldText: string,
        newText: string
    ): void;

    getRootHostContext(rootContainerInstance: Container): HostContext;

    getChildHostContext(
        parentHostContext: HostContext,
        type: string,
        rootContainerInstance: Container
    ): HostContext;

    finalizeInitialChildren(
        domElement: Instance,
        type: string,
        data: Data,
        rootContainerInstance: Container,
        hostContext: HostContext
    ): boolean;

    prepareForCommit(containerInfo: Container): Object | null | void;
    resetAfterCommit(containerInfo: Container): void;

    commitMount(
        domElement: Instance,
        type: string,
        newData: Data,
        internalInstanceHandle: Object
    ): void;
};
export const isImgElement = (node: Element): node is HTMLImageElement => {
    return node.tagName === 'IMG';
};