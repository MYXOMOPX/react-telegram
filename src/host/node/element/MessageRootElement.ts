import {ElementDummy, ElementRules} from "./type";

export type MessageRootElementDummy = ElementDummy<"messageRootElement", {
    uuid: string;
    chatId: string;
    messageId?: string;
}>

export const messageRootElementRules: ElementRules = {
    denyRawText: true,
    allowedInNodes: [],
}