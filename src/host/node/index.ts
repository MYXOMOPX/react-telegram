import {FormatElementDummy, MessageElementDummy, MessageRootElementDummy} from "./element";
import {SimpleNode} from "./type";

type MessengerDocument = any;

export type RawTextNode = SimpleNode<"rawText"> & {
    value: string
    $document: MessengerDocument; // CHANGE
    $root: ElementByName<"messageRootElement">;
}

export type Element =
    (
        | MessageRootElementDummy
        | FormatElementDummy
        | MessageElementDummy
    ) & {
        children: Array<Node>;
        updateElement: (props: any) => void;
        appendChild: (node: Node) => void;
        removeChild: (node: Node) => void;

        $document: MessengerDocument; // CHANGE
        $root: ElementByName<"messageRootElement">;
    }
;

export type Node = Element | RawTextNode;

// UTILS
export type ElementByName<T extends (Element["elementName"])> = Element & {nodeName: T};
export type ElementName<T extends Element> = T["elementName"];
export type ElementData<T extends Element> = T["data"];



const x = null as Element;

x.$root.children[0]
