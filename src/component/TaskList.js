import React, { useEffect, useState } from "react";
import TaskForm from "./Form";
import '../styles/TaskListStyles.css';
import Task from './Task';


let TaskList = () => {
    const [tasks, setTasks] = useState([]);


    const addTask = task => {
        if (task.text.trim()) {
            task.text = task.text.trim();
            const taskUpdated = [task, ...tasks];
            setTasks(taskUpdated);
        }
    };

    const deleteTask = id => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const completeTask = id => {
        const taskUpdated = tasks.map(task => {
            if (task.id === id) {
                task.complete = !task.complete;
            }
            return task;
        });
        setTasks(taskUpdated);
    };

    return (
        <>
            <TaskForm onSubmit={addTask} />
            <div className="task-list-container">
                {
                    tasks.map((task) =>
                        < Task
                            key={task.id}
                            /* debe tener un key para que react mantenga el orden de la lista */
                            id={task.id}
                            text={task.text}
                            complete={task.complete}
                            completeTask={completeTask}
                            deleteTask={deleteTask} />
                    )
                }
            </div>
        </>
    );
}

export default TaskList;