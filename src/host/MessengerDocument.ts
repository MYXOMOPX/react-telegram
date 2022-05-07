import {MessengerDocument, MessengerHostNode, NodeMessage} from "./node/nodes";




export const createMessageDocument = (): MessengerDocument => {

    let message: NodeMessage|undefined = undefined;

    let document: MessengerDocument;

    const queueRerender = () => {
        console.log(message);
    }

    const createElement = (type: string, props: any): MessengerHostNode => {
        const node: MessengerHostNode = {
            nodeName: type,
            children: [],
            props: props,
            $document: document,
            updateElement: (newProps) => {
                node.props = newProps;
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