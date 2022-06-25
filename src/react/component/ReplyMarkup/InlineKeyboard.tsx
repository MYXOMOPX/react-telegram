import RTElementData = ReactTelegram.RTElementData;
import RTInlineKeyboardButtonElement = ReactTelegram.RTInlineKeyboardButtonElement;
import {FC, PropsWithChildren, useContext, useEffect, useRef} from "react";
import { v4 as uuidv4 } from 'uuid';
import {CallbackQueryEvent} from "../../../../type/events";
import {RootBotContext} from "../../context/RootBotContext/RootBotContext";

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
    text?: string;
    onClick: () => CallbackQueryEvent["answer"] | void | undefined;
}

export const InlineClickButton: FC<InlineClickButtonProps> = (props) => {
    const {onClick, text} = props;

    // ToDo useLatestCallback
    const rootCtx = useContext(RootBotContext);
    const callbackDataRef = useRef(uuidv4());

    useEffect(() => {
        const listener = (event: CallbackQueryEvent) => {
            if (event.handled || event.query.data !== callbackDataRef.current) return;
            const answer = onClick();
            event.handled = true;
            event.answer = answer || undefined;
        }
        rootCtx.events.on("callbackQuery", listener);
        return () => { rootCtx.events.off("callbackQuery", listener) }
    }, [onClick])

    return (
        <inline-keyboard-button text={text} callback_data={callbackDataRef.current} />
    )
}