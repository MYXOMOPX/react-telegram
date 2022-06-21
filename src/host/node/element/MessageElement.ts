import {RTElementRules, MessageType, RTElement} from "./type";

export type RTMessageElement = RTElement<"message", {
    type: MessageType
}>

export const messageElementRules: RTElementRules = {
    denyRawText: false,
    allowedInNodes: ["messageRootElement"],
    denyChildren: false
}