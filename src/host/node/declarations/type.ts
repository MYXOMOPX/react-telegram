export interface NodeDeclaration<Props> {
    nodeName: string,
    rules?: {
        denyRawText?: boolean,
        denyChildren?: boolean,
        allowedInNodes?: string[]
    }
}
