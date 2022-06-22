import {FC, useEffect, useState} from "react";

export const ReactApp: FC = () => {

    const [text, setText] = useState("TEST");

    useEffect(() => {
        const timeoutId = setTimeout(() => {setText(t => t+" AFTER TIMEOUT")}, 5000);
        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <>
            {text}
            <format italic>
                TEST
            </format>
            <format bold>
                TEST 2
            </format>
        </>
    )
}