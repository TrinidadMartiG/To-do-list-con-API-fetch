import React, { useState, useEffect } from "react";
import '../styles/TaskFormStyles.css';
import { v4 as uuidv4 } from 'uuid';

let TaskForm = (props) => {

    const [input, setInput] = useState('');
    /*     const [fetchedTask, setFetchedTask] = useState([]); */

    /* GET function */
    useEffect(() => {
        getTask();
    }, []);

    /* API METODO GET  */
    const getTask = () => {
        const URL = "https://assets.breatheco.de/apis/fake/todos/user/trini";
        const configGet = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch(URL, configGet)
            .then((response) => {
                console.log(response, "response");
                return response.json();
            })
            .then((data) => console.log(data, "data"))
            .catch((error) => console.log(error, "error"));
    }
    function putList(task) {
        let newList = list.concat(task).map((tarea) => {
            return {
                label: tarea,
                done: false,
            };
        });
        const URL = "https://assets.breatheco.de/apis/fake/todos/user/trini";
        const configPut = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newList),
        };
        //función para mostrar como un arreglo de objetos la lista de tareas

        fetch(URL, configPut)
            .then((response) => {
                console.log(response, "response");
                return response.json();
            })
            .then((data) => console.log(data, "data"))
            .catch((error) => console.log(error, "error"));
        }     
        const dealChange = e => {
            /* extrae valor de campo de texto */
            setInput(e.target.value)
        };

        /* rescata valor, asigna id unico a tarea */
        const dealSend = e => {
            e.preventDefault();
            /* evita que se recarge app completa */

            const newTask = {
                /* uuidv4 asigna identificadores unicos */
                id: uuidv4(),
                text: input,
                /* rescata valor con hook desde input */
                done: false
                /* cambia posteriormente con onClick en el div a true */
                
            };
            /*pasamos información al apretar boton */
            props.onSubmit(newTask);
            /* limpia resetea valor renderizado despues del submit */
            e.target.reset();
        };

        return (
            <form className="task-form"
                onSubmit={dealSend}
                >
                <input
                    type="text"
                    className="task-input"
                    placeholder="Write it here..."
                    name="text"
                    onChange={dealChange}
                />
                <button className="task-button">
                    Add Task
                </button>
            </form>
        );
    }

    export default TaskForm;