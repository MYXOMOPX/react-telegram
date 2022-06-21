import {RTElement, RTElementRules} from "./type";

export type RTMessageRootElement = RTElement<"message-root", {
    uuid: string;
    chatId: string;
    messageId?: string;
}>

export const messageRootElementRules: RTElementRules = {
    denyRawText: true,
    allowedInNodes: [],
}