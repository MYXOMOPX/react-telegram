import {RTElementRules, MessageType, RTElement} from "./type";

export type MessageElementDummy = RTElement<"messageElement", {
    type: MessageType
}>

export const messageElementRules: RTElementRules = {
    denyRawText: false,
    allowedInNodes: ["messageRootElement"],
    denyChildren: false
}