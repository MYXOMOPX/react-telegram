import {FC, useEffect, useState} from "react";
import {Format, InlineButton, InlineKeyboard} from "../component";

export const ReactApp: FC = () => {

    const [text, setText] = useState("TEST");

    useEffect(() => {
        const timeoutId = setTimeout(() => {setText(t => t+" AFTER TIMEOUT")}, 5000);
        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <message>
            {text}
            <Format italic>
                {" "} TEST
            </Format>
            <Format bold>
                {" "} TEST 2
            </Format>
            <InlineKeyboard columns={2}>
                {/* InlineKeyboardRow */}
                <InlineButton text={"Button 1"} url={"https://google.ru"} />
                <InlineButton text={"Button 2"} url={"https://translate.google.ru"}/>
                <InlineButton text={"Button 3"} url={"https://translate.google.ru"}/>
                <InlineButton text={"Button 4"} url={"https://translate.google.ru"}/>
            </InlineKeyboard>
        </message>
    )
}