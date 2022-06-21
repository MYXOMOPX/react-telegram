import {RTNode} from "../type";

export type RawTextNode = RTNode<"rawText"> & {
    value: string
}