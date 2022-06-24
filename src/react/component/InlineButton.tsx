import RTElementData = ReactTelegram.RTElementData;
import RTInlineKeyboardButtonElement = ReactTelegram.RTInlineKeyboardButtonElement;
import {FC} from "react";

interface InlineButtonProps extends RTElementData<RTInlineKeyboardButtonElement>{

}

export const InlineButton: FC<InlineButtonProps> = (props) => {
    return (
        <inline-keyboard-button {...props}/>
    )
}