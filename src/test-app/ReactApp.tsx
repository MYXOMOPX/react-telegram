import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Format, InlineButton, InlineClickButton, InlineKeyboard, InlineKeyboardRow, Message} from "../react/component";
import TelegramBot from "node-telegram-bot-api";
import {useMessage} from "../react/hook";

interface ReactAppProps {
}

export const ReactApp: FC<ReactAppProps> = () => {

    const [count, setCount] = useState(1);
    const [name, setName] = useState("");
    const [listeningName, setListeningName] = useState(false);

    useMessage((msg) => {
        setName(msg.text);
        setListeningName(false);
    }, listeningName)


    const plus = useCallback(() => {
        setCount(c => c+1);
    }, []);
    const minus = useCallback(() => {
        setCount(c => c-1);
    }, []);
    const startListenName = useCallback(() => {
        setListeningName(true);
    }, [])

    return (
        <>
            <Message>
                <Format bold>Count:</Format> {count}
                <Format newLine bold>Listening:</Format> {listeningName ? "Yes" : "No"}
                {name ?
                    <Format newLine>
                        <Format bold>Your name is:</Format> {name}
                    </Format>
                    :
                    ""
                }
                <InlineKeyboard>
                    <InlineKeyboardRow>
                        <InlineClickButton text={"+"} onClick={plus} />
                        <InlineClickButton text={"-"} onClick={minus} />
                    </InlineKeyboardRow>
                    <InlineKeyboardRow>
                        <InlineClickButton text={"ENTER NAME"} onClick={startListenName} />
                    </InlineKeyboardRow>
                </InlineKeyboard>
            </Message>
        </>
    )
}