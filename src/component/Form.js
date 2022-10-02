import React, { useState } from "react";
import '../styles/TaskFormStyles.css';
import { v4 as uuidv4 } from 'uuid';

let TaskForm = (props) => {

    const [input, setInput] = useState('');

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
            complete: false
            /* cambia posteriormente con onClick en el div a true */
        };
        /*pasamos información al apretar boton */
        props.onSubmit(newTask);
        /* limpia resetea valor renderizado despues del submit */
        e.target.reset();
    };

    return (
        <form className="task-form"
            onSubmit={dealSend}>
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