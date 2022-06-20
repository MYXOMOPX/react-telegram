import {FormatElement, MessageElement, NodeRoot, RawTextNode, SomeNode} from "./node/nodes";

const parseRootNode = (node: NodeRoot) => {
    const children = node.children;
    if (children.length !== 1 || children[0].nodeName !== "message") {
        let reason = children.length !== 1 ? `${children.length} children` : `child with type "${children[0].nodeName}"`
        let errText = `Root node must contain only 1 <message/> child. But it contains ${reason}`;
        throw new Error(errText)
    }

    const messageSettings = children[0] as MessageElement;
    const data = parseMessageSettings(messageSettings);

    return {
        chatId: node.data.chatId,
        text: data.text,
        opts: data,
    }
}

const parseMessageSettings = (node: MessageElement) => {
    const text = parseChildrenToText(node);
    return {
        text,
        type: node.data.type
    };
}

const parseFormatNode = (node: FormatElement): string => {
    const str = parseChildrenToText(node);
    const data = node.data;
    const tags = [];
    if (data.italic) tags.push("i");
    if (data.bold) tags.push("strong");
    if (data.underline) tags.push("u");
    const openTags = tags.map(it => `<${it}>`).join("");
    const closeTags = tags.map(it => `</${it}>`).join("");
    return openTags + str + closeTags;
}

const parseChildrenToText = (parent: SomeNode): string => {
    const str = parent.children.map(it => {
        if (it.nodeName === "format") return parseFormatNode(it);
        if (it.nodeName === "rawtext") return parseRawTextNode(it);
        console.warn(`Node <${it.nodeName}/> in <${parent.nodeName}/> will be ignored`);
        return null
    })
        .filter(it => it !== null)
        .reduce((a,b) => a+b, "")
    ;
    return str;
}

const parseRawTextNode = (node: RawTextNode): string => {
    return node.data.value
}