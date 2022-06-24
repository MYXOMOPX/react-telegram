import { v4 as uuidv4 } from 'uuid';
import RTNode = ReactTelegram.RTNode;
import RTDocument = ReactTelegram.RTDocument;
import RTMessageRootElement = ReactTelegram.RTRootElement;
import RTElement = ReactTelegram.RTElement;


export const createRTDocument = (): RTDocument => {

    const rtDocument = {} as RTDocument;

    const rootElements: Array<RTMessageRootElement> = []



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
        // Mark message as changed
    }

    rtDocument.createElement =  (elementName, data): RTElement => {
        const element: RTElement = {
            data,
            elementName,
            type: "element",
            children: [],
        }
        if (elementName === "root" || elementName === "message") {
            ((elementName as any).uuid) = uuidv4()
        }
        return element;
    }

    rtDocument.createTextNode = (value) => {
        return {
            type: "rawText",
            value: value
        }
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