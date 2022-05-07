import {NodeDeclaration} from "./type";

export const formatNodeDeclaration: NodeDeclaration<{bold: boolean}> = {
    nodeName: "format",
    rules: {
        denyChildren: true
    }
}