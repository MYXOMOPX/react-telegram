import exp from "constants";
import {FC, PropsWithChildren} from "react";
import JSXElementData = JSX.JSXElementData;
import RTFormatElement = ReactTelegram.RTFormatElement;

type FormatProps = JSXElementData<RTFormatElement>

export const Format: FC<FormatProps> = (props) => {
    return (
        <format {...props}/>
    )
}