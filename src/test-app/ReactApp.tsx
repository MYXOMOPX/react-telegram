import {FC, useCallback, useEffect, useState} from "react";
import {Format, InlineButton, InlineClickButton, InlineKeyboard, InlineKeyboardRow, Message} from "../react/component";
import TelegramBot from "node-telegram-bot-api";

interface ReactAppProps {
}

export const ReactApp: FC<ReactAppProps> = () => {

    const [count, setCount] = useState(10);

    const plus = useCallback(() => {
        setCount(c => c+1);
    }, []);
    const minus = useCallback(() => {
        setCount(c => c-1);
    }, []);

    const justAnswer = useCallback(() => {
        return {text: "You clicked me"}
    }, [])

    const alertAnswer = useCallback(() => {
        return {text: "You clicked me", showAlert: true}
    }, [])

    return (
        <>
            <Message>
                <Format italic bold>
                    Current count: {count}
                </Format>
                <InlineKeyboard>
                    <InlineKeyboardRow>
                        <InlineClickButton text={"PLUS"} onClick={plus} />
                        <InlineClickButton text={"MINUS"} onClick={minus} />
                    </InlineKeyboardRow>
                </InlineKeyboard>
            </Message>
            <Message >
                <Format>Just test NOTIFIES</Format>
                <InlineKeyboard>
                    <InlineKeyboardRow>
                        <InlineClickButton text={"SILENT"} onClick={justAnswer} />
                        <InlineClickButton text={"ALERT"} onClick={alertAnswer} />
                    </InlineKeyboardRow>
                </InlineKeyboard>
            </Message>
        </>
    )
}