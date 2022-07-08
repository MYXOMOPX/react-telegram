import {FC, useCallback, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {ToDoListHeader} from "./ToDoList/ToDoListHeader";
import {ToDoListItem} from "./ToDoList/ToDoListItem";

interface ReactAppProps {
}

export const ReactApp: FC<ReactAppProps> = () => {

    const [tasks, setTasks] = useState<string[]>([]);


    const addTask = useCallback(() => {
        setTasks(arr => [...arr, uuidv4()])
    }, []);

    const removeTask = useCallback((uuid: string) => {
        setTasks(v => v.filter(it => it !== uuid))
    }, [])

    return (
        <>
            <ToDoListHeader
                count={tasks.length}
                onAdd={addTask}
            />
            {tasks.map(it => {
                const onRemove = () => removeTask(it);
                return (
                    <ToDoListItem key={it} uuid={it} onRemove={onRemove}/>
                )
            })}
        </>
    )
}