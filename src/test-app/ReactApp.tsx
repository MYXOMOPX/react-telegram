import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Format, InlineButton, InlineClickButton, InlineKeyboard, InlineKeyboardRow, Message} from "../react/component";
import TelegramBot from "node-telegram-bot-api";

interface ReactAppProps {
}

export const ReactApp: FC<ReactAppProps> = () => {

    const [count, setCount] = useState(1);

    const messages = useMemo(() => {
        return new Array(count).fill(null).map((_ ,i) => (
            <Message key={i}>
                <Format>I'm a message №{i}</Format>
            </Message>
        ))
    }, [count])

    const plus = useCallback(() => {
        setCount(c => c+1);
    }, []);
    const minus = useCallback(() => {
        setCount(c => c-1);
    }, []);

    const justAnswer = useCallback((answer) => {
        answer("You clicked me")
    }, [])

    const alertAnswer = useCallback((answer) => {
        return answer({text: "You clicked me", showAlert: true})
    }, [])

    return (
        <>
            <Message>
                <Format italic>
                    Messages count: <Format bold>{count}</Format>
                </Format>
                <InlineKeyboard>
                    <InlineKeyboardRow>
                        <InlineClickButton text={"+"} onClick={plus} />
                        <InlineClickButton text={"-"} onClick={minus} />
                    </InlineKeyboardRow>
                    <InlineKeyboardRow>
                        <InlineClickButton text={"SILENT"} onClick={justAnswer} />
                        <InlineClickButton text={"ALERT"} onClick={alertAnswer} />
                    </InlineKeyboardRow>
                </InlineKeyboard>
            </Message>
            {messages}
        </>
    )
}