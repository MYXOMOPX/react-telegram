import {FC, PropsWithChildren} from "react";

type InlineKeyboardProps = PropsWithChildren<{
    columns?: number;
}>

export const InlineKeyboard: FC<InlineKeyboardProps> = (props) => {
    const {columns, children} = props

    return (
        <inline-keyboard columns={columns}>
            {children}
        </inline-keyboard>
    )
}