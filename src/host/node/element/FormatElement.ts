import {RTElement, RTElementRules } from "./type";

export type FormatElementDummy = RTElement<"formatElement", {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}>

export const formatElementRules: RTElementRules = {} // DEFAULT