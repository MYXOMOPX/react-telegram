import {FC, PropsWithChildren} from "react";

type MessageProps = PropsWithChildren<{
    chatId: string | number;
}>

export const Message: FC<MessageProps> = (props) => {
    const {chatId, children} = props;

    // ToDO message context

    return (
        <message chat_id={chatId}>
            {children}
        </message>
    )
}