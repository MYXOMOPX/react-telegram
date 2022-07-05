
export const parseTextInsideElement = (element: ReactTelegram.RTElement): string => {
    const children = element.children;
    let text = "";
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.type === "rawText") {
            text += parseRawTextNode(child as ReactTelegram.RawTextNode);
        } else if (child.type === "element") {
            if ((child as ReactTelegram.RTElement).elementName !== "format") {
                // WARN maybe?
                continue;
            }
            text += parseTextElement(child as ReactTelegram.RTFormatElement)
        }
    }
    return text;
}


const escapeRawText = (text: string): string => {
    return text;
}

const parseRawTextNode = (node: ReactTelegram.RawTextNode): string => {
    return escapeRawText(node.value)
}

const parseTextElement = (element: ReactTelegram.RTFormatElement): string => {
    const data = element.data;
    let text = parseTextInsideElement(element);
    if (data.bold) text = "<b>"+text+"</b>"
    if (data.italic) text = "<i>"+text+"</i>"
    if (data.underline) text = "<u>"+text+"</u>"
    if (data.newLine) text = "\n"+text;
    return text;
}