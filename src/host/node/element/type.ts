import {RTNode} from "../type";

export interface ElementDummy<T extends  string = string, Data = any> extends RTNode<"element">{
    elementName: T;
    data?: Data;
}

export interface RTElement<T extends  string = string, Data = any> extends RTNode<"element"> {
    elementName: T;
    data?: Data;

    children: Array<RTNode>;
    updateElement: (data: Partial<Data>) => void;
    appendChild: (node: RTNode) => void;
    removeChild: (node: RTNode) => void;
}

export interface RTElementRules {
    denyRawText?: boolean,
    denyChildren?: boolean,
    allowedInNodes?: string[]
}


export type MessageType = "text" | "document" | "image" // TODO add more types and move out from elements dir