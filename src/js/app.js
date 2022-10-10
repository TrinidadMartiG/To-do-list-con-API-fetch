import React from "react";
import "../styles/index.css";
import TaskList from "../component/TaskList";

let App = () => {
    
    return (
        <div className="task-app">
            <div>
                <h1>There's something you need to do?</h1>
            </div>
            <div className="task-principal-list">
                <h1 className="list-title">My To Do's</h1>
                <TaskList />
            </div>
        </div>
    );
}

export default App;