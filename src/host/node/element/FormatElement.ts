import {ElementDummy, ElementRules } from "./type";

export type FormatElementDummy = ElementDummy<"formatElement", {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
}>

export const formatElementRules: ElementRules = {} // DEFAULT