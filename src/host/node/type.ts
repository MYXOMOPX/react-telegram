import { RTElement } from "./element";
import type { RTDocument } from "../document/type";

export type RTNodeType = "rawText" | "element"
export interface RTNode<T extends RTNodeType = RTNodeType> {
    type: T;
    $document: RTDocument; // CHANGE
    $root: RTElement;
}