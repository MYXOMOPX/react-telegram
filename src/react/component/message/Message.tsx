import {createContext, FC, PropsWithChildren, useContext, useState} from "react";
import {RootBotContext} from "../../context/RootBotContext/RootBotContext";
import {useDocumentSubscribe} from "../../hook";
import RTMessageElement = ReactTelegram.RTMessageElement;

type MessageProps = PropsWithChildren<{}>

export const Message: FC<MessageProps> = (props) => {
    const {children} = props;

    const [msg, setMsg] = useState<RTMessageElement|undefined>();
    const { rtDocument } = useContext(RootBotContext);
    const [value, setValue] = useState<MessageContextType>({isSent: false});

    useDocumentSubscribe(
        rtDocument.ownMessageEvents,
        msg?.uuid,
        (event) => {
            setValue({
                isSent: true,
                messageId: event.message.message_id
            })
        }
    )

    return (
        <MessageContext.Provider value={value}>
            <message ref={setMsg}>
                {children}
            </message>
        </MessageContext.Provider>
    )
}

// TODO ADD messageUUID
export type MessageContextType = {
    messageId?: number,
    isSent: false
} | {
    messageId: number,
    isSent: true
}

export const MessageContext = createContext<MessageContextType>(null as any);