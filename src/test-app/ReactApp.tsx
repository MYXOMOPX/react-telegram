import {FC, useEffect, useState} from "react";
import {Format, InlineButton, InlineKeyboard, Message} from "../react/component";
import TelegramBot from "node-telegram-bot-api";

interface ReactAppProps {
    chatId: string | number;
}

export const ReactApp: FC<ReactAppProps> = ({chatId}) => {

    const [text, setText] = useState("TEST");
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setText(t => t+" AFTER TIMEOUT");
            setIsChanged(true);
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <>
            <Message chatId={chatId}>
                <Format italic bold>
                    {text}
                </Format>
                <InlineKeyboard columns={2}>
                    <InlineButton text={"Button 1"} url={"https://google.ru"} />
                </InlineKeyboard>
            </Message>
            <Message chatId={chatId}>
                <Format>He is changed - {isChanged ? "Yes" : "No"}</Format>
            </Message>
        </>
    )
}