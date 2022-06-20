import {ElementDummy, ElementRules, MessageType} from "./type";

export type MessageElementDummy = ElementDummy<"messageElement", {
    type: MessageType
}>

export const messageElementRules: ElementRules = {
    denyRawText: false,
    allowedInNodes: ["messageRootElement"],
    denyChildren: false
}