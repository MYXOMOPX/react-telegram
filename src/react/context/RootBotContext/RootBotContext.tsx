import React from "react";
import {RootBotContextType} from "./type";

export const RootBotContext = React.createContext<RootBotContextType>(null as any);
RootBotContext.displayName = "RootBotContext";

export const RootBotContextProvider = RootBotContext.Provider;