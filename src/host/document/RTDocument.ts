import {RTDocument} from "./type";
import {RTElement, RTMessageRootElement} from "../node";
import { v4 as uuidv4 } from 'uuid';
import {RTNode} from "../node/type";


export const createRTDocument = (): RTDocument => {

    const rtDocument = {} as RTDocument;

    const rootElements: Array<RTMessageRootElement> = []

    // remove mutation methods from elements
    // remove circulars from
    // pototype pollution
    const updateElement = () => {

    }

    const appendChild = (parentInstance: RTElement, node: RTNode) => {
        parentInstance.children.push(node);
    }

    const insertBefore = (parentInstance: RTElement, child: RTNode, beforeChild: RTNode) => {
        const children = parentInstance.children;
        const index = children.indexOf(beforeChild);
        children.splice(index, 0, child);
    }

    const removeChild = (parentInstance: RTElement, node: RTNode) => {
        parentInstance.children = parentInstance.children.filter(it => it !== node);
    }


    rtDocument.createElement =  (root, elementName, data): RTElement => {
        let element = {
            data,
            elementName,
            updateElement,
            type: "element",
            $document: rtDocument,
            $root: root,
            children: [],
        } as any as RTElement;
        element.appendChild = appendChild.bind(null, element);
        element.removeChild = removeChild.bind(null, element);
        element.insertBefore = insertBefore.bind(null, element);
        return element;
    }

    rtDocument.createTextNode = (root, value) => {
        return {
            type: "rawText",
            $document: rtDocument,
            $root: root,
            value: value
        }
    }

    rtDocument.instantiateRoot = (chatId) => {
        const uuid = uuidv4()
        const element = rtDocument.createElement(null as any, "root-message", {uuid, chatId});
        const rootEl = element as RTMessageRootElement;
        rootEl.$root = rootEl;
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