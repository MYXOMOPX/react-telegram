import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Format, InlineButton, InlineClickButton, InlineKeyboard, InlineKeyboardRow, Message} from "../react/component";
import TelegramBot from "node-telegram-bot-api";
import {useMessage} from "../react/hook";
import {useReply} from "../react/hook/useReply";

interface ReactAppProps {
}

export const ReactApp: FC<ReactAppProps> = () => {

    const [count, setCount] = useState(1);
    const [name, setName] = useState("");

    const [startListen, listening] = useMessage((msg, bot, stopListen) => {
        setName(msg.text);
        stopListen();
        return true;
    }, false)


    const plus = useCallback(() => {
        setCount(c => c+1);
    }, []);
    const minus = useCallback(() => {
        setCount(c => c-1);
    }, []);

    return (
        <>
            <Message>
                <Format bold>Count:</Format> {count}
                <Format newLine bold>Listening:</Format> {listening ? "Yes" : "No"}
                {name ?
                    <Format newLine>
                        <Format bold>Your name is:</Format> {name}
                    </Format>
                    :
                    ""
                }
                <ReplyBoard/>
                <InlineKeyboard>
                    <InlineKeyboardRow>
                        <InlineClickButton text={"+"} onClick={plus} />
                        <InlineClickButton text={"-"} onClick={minus} />
                    </InlineKeyboardRow>
                    <InlineKeyboardRow>
                        <InlineClickButton text={"ENTER NAME"} onClick={startListen} />
                    </InlineKeyboardRow>
                </InlineKeyboard>
            </Message>
        </>
    )
}

const ReplyBoard: FC = () => {
    const [lastReply, setLastReply] = useState<string|undefined>()

    useReply((msg) => {
        setLastReply(msg.text);
    })

    if (!lastReply) return;

    return (
        <Format newLine>
            <Format bold>Your last reply is:</Format> {lastReply}
        </Format>
    )
}