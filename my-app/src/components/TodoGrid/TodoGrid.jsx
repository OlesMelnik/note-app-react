
import React from "react";

import './TodoGrid.css';

import Todo from "../Todo/Todo.jsx";



class TodoGrid extends React.Component {



    constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.state = { todolist: this.props.todolist };
    }

    componentDidUpdate(prevProps) {
        if(this.props.todolist !== prevProps.todolist) {
            this.setState({todolist: this.props.todolist});
        }
    }

    filter(e) {
        console.log(this.state.todolist);
        let filteredList = this.props.todolist.filter((task) => {
            return task.text.toLowerCase().search(e.target.value.toLowerCase()) !== -1
        });
        this.setState({ todolist: filteredList });
    }

    render() {
        return (<div>
            <input placeholder="search" className="search" onInput={this.filter} />
            <div className="todo-grid" ref="grid">
                {
                    this.state.todolist.map((todo) => {
                        console.log("id", todo.id , "done", todo.done);
                        
                        return <Todo
                            key={todo.id}
                            id={todo.id}
                            text={todo.text}
                            done={todo.done}
                            deleteTodo={this.props.deleteTodo.bind(this)}
                            changeType = {this.props.changeType.bind(this)}
                        />
                    })
                }
            </div></div>)
    }
}

export default TodoGrid;