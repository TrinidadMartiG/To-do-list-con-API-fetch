import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";


let Task = ({ id, label, complete, completeTask, deleteTask }) => {
    return (
        <div className={complete ? 'task-container complete' : 'task-container'}>
            <div
                className="task-text"
                onClick={() => completeTask(id)}>
                {label}
            </div>
            <div
                className="task-icon-container"
                onClick={() => deleteTask(id)}>
                <AiOutlineCloseCircle className="task-icon" />
            </div>
        </div>
    );
}

export default Task;