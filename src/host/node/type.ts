// import {MessengerDocument, NodeRoot} from "../nodes";

export type RTNodeType = "rawText" | "element"
export interface RTNode<T extends RTNodeType = "element"> {
    type: T;
    $document: any; // CHANGE
    $root: RTNode;
}