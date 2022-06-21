import {RawTextNode, RTElement, RTMessageRootElement} from "../node";

export interface RTDocument {
    instantiateRoot: (chatId: string) => RTMessageRootElement;
    getRootByMessageId: (messageId: string) => RTMessageRootElement | null;
    getRootByUUID: (uuid: string) => RTMessageRootElement | null;
    destroyRoot: (root: RTMessageRootElement) => void;

    createElement: (root: RTElement, name: string, data?: any) => RTElement
    createTextNode: (root: RTElement, value: string) => RawTextNode
}