import { useState } from "react"
import { TaskContext } from "./TaskContext"

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState({
        todo: [],
        progress: [],
        done: [],
        completed: [],
    })

    const addTask = (newTask) => {
        setTasks(prevTasks => ({
            ...prevTasks,
            todo: [...prevTasks.todo, newTask]
        }));
    };

    console.log(tasks);


    const taskInfo = {
        tasks, setTasks, addTask
    }


    return (
        <TaskContext value={taskInfo}>
            {children}
        </TaskContext>
    )
}