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
            .then(response => console.log('fetchTask response', response, setFetchedTask(response),console.log("console.log setfetchedtask",setFetchedTask)))
    }
    fetch('https://assets.breatheco.de/apis/fake/todos/user/trini', {
        method: "PUT",
        body: JSON.stringify(tasks),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
          console.log(resp.ok); // will be true if the response is successfull
          console.log(resp.status); // the status code = 200 or code = 400 etc.
          console.log(resp.text()); // will try return the exact result as string
          return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
        tasks
        console.log(data); //this will print on the console the exact object received from the server
      })
      .catch(error => {
          //error handling
          console.log(error);
      });

    useEffect(() => {
        fetchTask()
    }, []);

    const addTask = (taskFromDealSend) => {
        {
            const taskUpdated = fetchedTasks === [] ? [fetchedTasks, ...tasks] : [taskFromDealSend, ...tasks];
            setTasks(taskUpdated);
        }
    };
  
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
        console.log('addTask', addTask)

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
                
                    tasks.map((elm, indx) =>
                        < Task
                            key={elm.id}
                            /* debe tener un key para que react mantenga el orden de la lista */
                            id={elm.id}
                            label={elm.label}
                            complete={elm.complete}
                            completeTask={completeTask}
                            deleteTask={deleteTask} />,
                    )
                }
            </div>
        </>
    );
}

export default TaskList;