
export interface BotNode<T extends  string = string, P = any> {
    nodeName: T;
    children: Array<BotNode<any>>;
    props?: P;
}


export function createNode<T extends string, P>(
    nodeName: T,
    props?: P,
): BotNode<T, P> {
    return {nodeName, children: [], props}
}

export function appendChildNode(parentNode: BotNode, childNode: BotNode) {
    parentNode.children.push(childNode);
}

export function removeChildNode(parentNode: BotNode, removedNode: BotNode) {
    parentNode.children = (parentNode.children as any).filter(
        (node: BotNode) => node !== removedNode,
    );
}

export function insertBeforeNode(root: BotNode, inserted: BotNode, before: BotNode) {
    const beforeIndex = root.children.indexOf(before);
    root.children.splice(beforeIndex, 0, inserted);
}

export function updateNode<T extends string, P>(
    node: BotNode<T,P>,
    _updatePayload: unknown,
    _type: unknown,
    oldProps: P,
    newProps: P,
) {
    node.props = newProps;
}

