import React, { useState, useEffect } from "react";
import '../styles/TaskListStyles.css';
import Task from './TaskComponent';
import { v4 as uuidv4 } from 'uuid';

let TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [fetchedTasks, setFetchedTask] = useState([])

    /* GET FETCH */
    const fetchTask = () => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/trini")
            .then(data => data.json())
            .then(response => setFetchedTask(response))
    }
    const putTask = () =>{
        /* formato de información enviada */
        let header = new Headers();
        header.append("Content-Typpe", "application/json")
        /* definicion de información enviada */
        let body = JSON.stringify([
            {fetchedTasks}
        ])
        let requestOptions = {
            method: "PUT",
            headers: header,
            body: body,
            redirect: "follow"
        }

        fetch("https://assets.breatheco.de/apis/fake/todos/user/trini")
        .then(data=>data.json)
        .then(response=>console.log)
    }
    useEffect(() => {
        fetchTask();
    }, []);

    const addTask = (taskFromDealSend) => {
        {   
            const taskUpdated = fetchedTasks === null ? [fetchedTasks,...tasks] : [taskFromDealSend,...tasks];
            setTasks(taskUpdated);
        }
    };
    /*Termino GET FETCH */

    /* Inicio PUT FETCH */
        
    /* Termino PUT FETCH */
    const deleteTask = id => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const dealChange = e => {
        /* extrae valor de campo de texto */
        e.preventDefault()
        setInput(e.target.value)
        console.log(e.target.value, 'dealChange e.target.value')
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

    const dealSend = e => {
        /* evita que se recarge app completa */
        e.preventDefault();
        const newTask = {
            /* uuidv4 asigna identificadores unicos */
            id: uuidv4(),
            label: input,
            /* rescata valor con hook desde input */
            done: false
            /* cambia posteriormente con onClick en el div a true */
        };
        /*task.onSubmit(newTask);*/
        addTask(newTask)
        console.log('addTask',addTask)
        
    };

    return (
        <>
            <form className="task-form">
                <input
                    type="text"
                    className="task-input"
                    placeholder="Write it here..."
                    name="label"
                    onChange={dealChange}
                />
                <button className="task-button" onClick={dealSend}>
                    Add Task
                </button>


            </form>

            <div className="task-list-container">
                {
                    tasks.map((task) =>
                        < Task
                            key={task.id}
                            /* debe tener un key para que react mantenga el orden de la lista */
                            id={task.id}
                            label={task.label}
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