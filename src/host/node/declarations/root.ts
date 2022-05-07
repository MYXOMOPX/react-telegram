import {NodeDeclaration} from "./type";

export const rootNodeDeclaration: NodeDeclaration<{}> = {
    nodeName: "root",
    rules: {
        denyRawText: true,
        allowedInNodes: []
    }
}