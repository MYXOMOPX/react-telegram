import {FC, useEffect, useState} from "react";


export const ReactApp: FC = () => {

    const [text, setText] = useState("TEST");

    useEffect(() => {
        const timeoutId = setTimeout(() => {setText(t => t+" AFTER TIMEOUT")}, 5000);
        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <message>
            {text}
            <format italic={true}>
                TEST
            </format>
            <format italic={false}>
                TEST 2
            </format>
        </message>
    )
}