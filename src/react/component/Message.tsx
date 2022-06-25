import {FC, PropsWithChildren} from "react";

type MessageProps = PropsWithChildren<{

}>

export const Message: FC<MessageProps> = (props) => {
    const {children} = props;

    // ToDO message context

    return (
        <message>
            {children}
        </message>
    )
}