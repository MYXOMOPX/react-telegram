import RTElementData = ReactTelegram.RTElementData;
import RTInlineKeyboardButtonElement = ReactTelegram.RTInlineKeyboardButtonElement;
import {FC, PropsWithChildren, useContext, useRef} from "react";
import { v4 as uuidv4 } from 'uuid';
import {RootBotContext} from "../../context/RootBotContext/RootBotContext";
import {useDocumentSubscribe} from "../../hook";
import {getEventChannelForQueryButton} from "../../../util";
import {MessageContext} from "../message/Message";
import {CallbackQueryAnswer, CallbackQueryAnswerFunction} from "../../../../type/events";

type InlineKeyboardProps = PropsWithChildren<{}>

export const InlineKeyboard: FC<InlineKeyboardProps> = (props) => {
    const {children} = props

    return (
        <reply-markup type={"inline"}>
            {children}
        </reply-markup>
    )
}

type InlineKeyboardRowProps = PropsWithChildren<{}>

export const InlineKeyboardRow: FC<InlineKeyboardRowProps> = (props) => {
    return <inline-keyboard-row {...props}/>
}

interface InlineButtonProps extends RTElementData<RTInlineKeyboardButtonElement>{}

export const InlineButton: FC<InlineButtonProps> = (props) => {
    return (
        <inline-keyboard-button {...props}/>
    )
}

type InlineClickButtonProps = {
    text: string;
    onClick: (answer: CallbackQueryAnswerFunction) => void;
}

export const InlineClickButton: FC<InlineClickButtonProps> = (props) => {
    const {onClick, text} = props;

    // ToDo useLatestCallback
    const { chatId } = useContext(RootBotContext);
    const { messageId } = useContext(MessageContext)
    const callbackDataRef = useRef(uuidv4());

    useDocumentSubscribe(
        "callbackQuery",
        getEventChannelForQueryButton(chatId, messageId, callbackDataRef.current),
        async (event) => {
            onClick(event.answer);
            event.handled = true;
        }
    )

    return (
        <inline-keyboard-button text={text} callback_data={callbackDataRef.current} />
    )
}