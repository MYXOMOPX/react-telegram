import {NodeDeclaration} from "./type";

export const messageSettingsNodeDeclaration: NodeDeclaration<{type: string}> = {
    nodeName: "message-settings",
    rules: {
        allowedInNodes: ["root"],
    }
}
