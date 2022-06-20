import {RTElement, RTElementRules} from "./type";

export type MessageRootElementDummy = RTElement<"messageRootElement", {
    uuid: string;
    chatId: string;
    messageId?: string;
}>

export const messageRootElementRules: RTElementRules = {
    denyRawText: true,
    allowedInNodes: [],
}