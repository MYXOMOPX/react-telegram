import { v4 as uuidv4 } from 'uuid';
import RTNode = ReactTelegram.RTNode;
import RTDocument = ReactTelegram.RTDocument;
import RTMessageRootElement = ReactTelegram.RTMessageRootElement;
import RTElement = ReactTelegram.RTElement;

export const createRTDocument = (): RTDocument => {

    const rtDocument = {} as RTDocument;

    const rootElements: Array<RTMessageRootElement> = []

    // remove mutation methods from elements
    // remove circulars from
    // pototype pollution
    // rtDocument.updateElement = () => {
    //
    // }

    rtDocument.appendChild = (parentInstance: RTElement, node: RTNode) => {
        parentInstance.children.push(node);
    }

    rtDocument.insertBefore = (parentInstance: RTElement, child: RTNode, beforeChild: RTNode) => {
        const children = parentInstance.children;
        const index = children.indexOf(beforeChild);
        children.splice(index, 0, child);
    }

    rtDocument.removeChild = (parentInstance: RTElement, node: RTNode) => {
        parentInstance.children = parentInstance.children.filter(it => it !== node);
    }


    rtDocument.createElement =  (root, elementName, data): RTElement => {
        return {
            data,
            elementName,
            type: "element",
            children: [],
        }
    }

    rtDocument.createTextNode = (root, value) => {
        return {
            type: "rawText",
            value: value
        }
    }

    rtDocument.instantiateRoot = (chatId) => {
        const uuid = uuidv4()
        const element = rtDocument.createElement(null as any, "root-message", {uuid, chatId});
        const rootEl = element as RTMessageRootElement;
        rootElements.push(rootEl);
        return rootEl;
    }

    rtDocument.getRootByMessageId = (messageId) => {
        return rootElements.find(it => it.data.messageId === messageId) || null
    }

    rtDocument.destroyRoot = (root) => {
        // ToDo react.unmount?
        const index = rootElements.indexOf(root);
        rootElements.splice(index, 1);
    }

    return rtDocument;
}