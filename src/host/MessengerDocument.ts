import {MessengerDocument, Element, MessageElement, RawTextNode} from "./node/nodes";




export const createMessageDocument = (): MessengerDocument => {

    let message: MessageElement|undefined = undefined;

    let document: MessengerDocument;

    const queueRerender = () => {
        console.log(message);
    }

    const createElement = (type: string, data: any): Element => {
        const node: Element = {
            nodeName: type,
            children: [],
            data,
            $document: document,
            updateElement: (newProps) => {
                node.data = newProps;
                queueRerender();
            },
            appendChild: (child) => {
                node.children.push(child);
                queueRerender();
            },
            removeChild: (child) => {
                node.children = node.children.filter(it => it !== child);
                queueRerender();
            }
        }
        return node;
    }

    const createTextNode = (value: string): RawTextNode => {
        return {
            nodeName: "rawtext",
            $document: document,
            data,
            children: [],

        }
    }

    const setMessage = (node) => {
        message = node;
    }
    const getMessage = () => {
        return message;
    }

    return {
        sendMessage: null,
        updateMessage: null,
        setMessage,
        getMessage,
        createElement
    }
}