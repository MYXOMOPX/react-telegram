import {RTElement, RTElementRules } from "./type";

export type RTFormatElement = RTElement<"format", {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}>

export const formatElementRules: RTElementRules = {} // DEFAULT