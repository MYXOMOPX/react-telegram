import {Format, InlineClickButton, InlineKeyboard, InlineKeyboardRow, Message} from "../../react/component";
import {FC, useState} from "react";
import {useReply} from "../../react/hook/useReply";

interface ToDoListItemContentProps {
    uuid: string;
    onRemove: () => void;
}

const ToDoListItemContent: FC<ToDoListItemContentProps> = (props) => {
    const {onRemove} = props;

    const [name, setName] = useState<string>("Nameless ToDo Item");
    const [description, setDescription] = useState<string|undefined>(undefined);
    const [done, setDone] = useState<boolean>(false);

    useReply((msg) => {
        const text = msg.text;
        if (!text) return;
        if (text.startsWith("/name ")) {
            setName(text.split("/name ")[1])
        } else {
            setDescription(text);
        }
    })

    const switchDone = () => {
        setDone(d => !d);
    }

    return (
        <>
            ===== <Format bold>{name}</Format> =====
            {description && (
                <Format newLine>
                    <Format bold>Description: </Format> {description}
                </Format>
            )}
            <Format newLine>Done: {done ? "Yes" : "No"}</Format>

            <InlineKeyboard>
                <InlineKeyboardRow>
                    <InlineClickButton onClick={switchDone} text={ done ? "🔙 Undone" : "✅ Done"}/>
                </InlineKeyboardRow>
                <InlineKeyboardRow>
                    <InlineClickButton onClick={onRemove} text={"❌ Remove"}/>
                </InlineKeyboardRow>
            </InlineKeyboard>
        </>
    )
}

export const ToDoListItem: FC<ToDoListItemContentProps> = (props) => {
    return (
        <Message>
            <ToDoListItemContent {...props}/>
        </Message>
    )
}