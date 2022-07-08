import {Format, InlineClickButton, InlineKeyboard, Message} from "../../react/component";
import {FC} from "react";


interface ToDoListHeaderProps {
    count: number;
    onAdd: () => void;
}

export const ToDoListHeader: FC<ToDoListHeaderProps> = ({count, onAdd}) => {
    return (
        <Message>
            <Format>Your <Format bold>ToDo List</Format> contains: <Format underline>{count}</Format> items</Format>
            <InlineKeyboard>
                <InlineClickButton onClick={onAdd} text={"Add new"}/>
            </InlineKeyboard>
        </Message>
    )
}