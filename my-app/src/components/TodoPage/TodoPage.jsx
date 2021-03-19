import React from "react";
import TodoApp from "../TodoApp/TodoApp.jsx";

import './TodoPage.css';


class TodoPage extends React.Component {
    render() {
        return (<div className="todo-page">
            <h2 className="todo-header">Gogle Todos Here</h2>
            <TodoApp />
        </div>)
    }
}


export default TodoPage;