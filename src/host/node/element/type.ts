import {SimpleNode} from "../type";

export interface ElementDummy<T extends  string = string, Data = any> extends SimpleNode<"element">{
    elementName: T;
    data?: Data;
}

export interface ElementRules {
    denyRawText?: boolean,
    denyChildren?: boolean,
    allowedInNodes?: string[]
}


export type MessageType = "text" | "document" | "image" // TODO add more types and move out from elements dir