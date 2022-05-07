
export interface MessengerDocument { // It's like document
    sendMessage: any;
    updateMessage: any;

    // doc methods
    createElement: (type: string, props: any) => MessengerHostNode;

    getMessage?: () => NodeMessage
    setMessage: (node: NodeMessage) => void;

}

export interface MessengerHostNode<T extends  string = string, P = any> {
    nodeName: T;
    children: Array<SomeNode>;
    props?: P;

    // doc methods:
    $document: MessengerDocument;
    updateElement: (props: any) => void;
    appendChild: (node: MessengerHostNode) => void;
    removeChild: (node: MessengerHostNode) => void;
}

export type NodeMessageType = "text" | "document" | "image" // TODO add more types

export type NodeMessage = MessengerHostNode<"message", {
  type: NodeMessageType
}>

export type NodeFormat = MessengerHostNode<"format", {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}>

export type RawTextNode = MessengerHostNode<"rawtext", never>;


export type SomeNode =
    | NodeFormat
    | NodeMessage
    | RawTextNode
;