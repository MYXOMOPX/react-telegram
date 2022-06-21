import {formatElementRules} from "./FormatElement";
import {messageRootElementRules} from "./MessageRootElement";
import {messageElementRules} from "./MessageElement";

export * from "./type"
export * from "./FormatElement"
export * from "./MessageElement"
export * from "./MessageRootElement"

export const elementRulesMap = {
    "format": formatElementRules,
    "message-root": messageRootElementRules,
    "message": messageElementRules
}