// import {MessengerDocument, NodeRoot} from "../nodes";

export type TypeOfNode = "rawText" | "element"
export interface SimpleNode<T extends TypeOfNode = "element"> {
    type: T;
}