import { v4 as uuidv4 } from 'uuid';
import RTNode = ReactTelegram.RTNode;
import RTDocument = ReactTelegram.RTDocument;
import RTMessageRootElement = ReactTelegram.RTRootElement;
import RTElement = ReactTelegram.RTElement;
import RTMessageElement = ReactTelegram.RTMessageElement;


export const createRTDocument = (): RTDocument => {

    const rtDocument = {} as RTDocument;

    const rootElements: Array<RTMessageRootElement> = []

    const markMessageOfNodeAsChanged = (node: RTNode) => {
        let parent = node.parent;
        while (parent.elementName !== "message") {
            parent = parent.parent;
        }
        (parent as RTMessageElement).isChanged = true;
    }

    rtDocument.appendChild = (parentInstance: RTElement, child: RTNode) => {
        parentInstance.children.push(child);
        child.parent = parentInstance;
    }

    rtDocument.insertBefore = (parentInstance: RTElement, child: RTNode, beforeChild: RTNode) => {
        const children = parentInstance.children;
        const index = children.indexOf(beforeChild);
        children.splice(index, 0, child);
        child.parent = parentInstance;
    }

    rtDocument.removeChild = (parentInstance: RTElement, child: RTNode) => {
        parentInstance.children = parentInstance.children.filter(it => it !== child);
        child.parent = parentInstance;
    }

    rtDocument.updateElement = (element, data) => {
        element.data = data;
        markMessageOfNodeAsChanged(element);
    }

    rtDocument.updateTextInstance = (rawTextNode, text) => {
        rawTextNode.value = text;
        markMessageOfNodeAsChanged(rawTextNode);
    }

    rtDocument.createElement =  (elementName, data): RTElement => {
        const element: RTElement = {
            data,
            elementName,
            type: "element",
            children: [],
        }
        if (elementName === "root" || elementName === "message") {
            ((element as any).uuid) = uuidv4()
        }
        if (elementName === "message") {
            const msg = element as RTMessageElement;
            msg.rerenderStatus = "None";
            msg.isChanged = false;
        }
        return element;
    }

    rtDocument.createTextNode = (value) => {
        return {
            type: "rawText",
            value: value
        }
    }

    rtDocument.getMessagesToRender = (root) => {
        const child = root.children;
        const messages = child as RTMessageElement[];
        return messages.filter(it => {
            if (it.messageId === undefined && it.rerenderStatus === "None") return true;
            return it.isChanged;
        })
    }

    rtDocument.instantiateRoot = () => {
        const element = rtDocument.createElement( "root");
        const rootEl = element as RTMessageRootElement;
        rootElements.push(rootEl);
        return rootEl;
    }

    rtDocument.destroyRoot = (root) => {
        // ToDo react.unmount?
        const index = rootElements.indexOf(root);
        rootElements.splice(index, 1);
    }

    return rtDocument;
}