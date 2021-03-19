import React from "react";

import './Todo.css';


function TodoText(props) {
    const isDone = props.done;
    if (isDone) {
        return <span className="done">{props.text}</span>
    }
    return <span>{props.text}</span>
}

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.changeClass = this.changeClass.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    changeClass() {
        this.props.changeType(this.props.id);
    }

    deleteTodo() {
        this.props.deleteTodo(this.props.id);
    }
    
    render() {
        return (<div className="todo">
            <div onClick={this.changeClass}>
                <TodoText done={this.props.done} text={this.props.text}></TodoText></div>
            <div className="delete-todo" onClick={this.deleteTodo}><i className="fas fa-trash"></i></div>
        </div>)
    }
}

export default Todo;