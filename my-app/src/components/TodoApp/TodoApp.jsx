
import React from "react";

import './TodoApp.css';

import TodoGrid from "../TodoGrid/TodoGrid.jsx";


// const data = [
//     {
//         id: 1,
//         text: "Go to the store",
//         done: false
//     },
//     {
//         id: 2,
//         text: "Feed your pet",
//         done: false
//     },
//     {
//         id: 3,
//         text: "Clean your bedroom",
//         done: false
//     },
//     {
//         id: 4,
//         text: "Do React Homework",
//         done: false
//     },


// ];


//localStorage.setItem("todos", JSON.stringify(data));

var data = JSON.parse(localStorage.getItem("todos"));



class TodoApp extends React.Component {


    constructor() {
        super();
        this.state = { todolist: data, text: '' , filteredTodoList: data};
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.filterAll = this.filterAll.bind(this);
        this.filterNew = this.filterNew.bind(this);
        this.filterComplited = this.filterComplited.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);

    }

    handleTextChange(event) {
        this.setState({ text: event.target.value })
    }

    handleTaskAdd() {
        let newTask = {
            id: Date.now(),
            text: this.state.text,
            done: false
        }
        let newTodoList = this.state.todolist.slice();
        newTodoList.unshift(newTask);
        localStorage.setItem("todos", JSON.stringify(newTodoList));
        this.setState({ todolist: newTodoList });
        this.setState({ filteredTodoList: newTodoList });
        this.setState({ text: ''});
    }

    handleDeleteTodo(id){
        let newTodoList= this.state.todolist.filter(function (todo) {
            return todo.id != id;
        });
        let newFilterList= this.state.filteredTodoList.filter(function (todo) {
            return todo.id != id;
        });
        this.setState({todolist: newTodoList, filteredTodoList: newFilterList});
        localStorage.setItem("todos", JSON.stringify(newTodoList));
    }
    
    handleChangeType(id) {
        let newTodoList = this.state.todolist;
        console.log(id);
        newTodoList.forEach(task => {
            if (task.id == id) {
                task.done = !task.done;
            }
        });
        localStorage.setItem("todos", JSON.stringify(newTodoList));
        this.setState({ todolist: newTodoList });
        console.log(this.state.todolist);
    }

    filterAll() {
        this.setState({filteredTodoList: this.state.todolist});
    }

    filterComplited(){
        var filter = this.state.todolist.filter((task) => {
            return task.done === true;
        });
        this.setState({filteredTodoList: filter});
        console.log(filter);
        console.log("Complited State", this.state.filteredTodoList);
    }

    filterNew() {
        var filter = this.state.todolist.filter((task) => {
            return task.done === false;
        });
        console.log(filter);
        this.setState({filteredTodoList: filter});
        console.log("New State", this.state.filteredTodoList);
    }

    render() {
        return (<div className="todo-app">
            <div className="add-todo">
                <textarea placeholder="Enter task..." value={this.state.text}rows={1} className="textarea"
                    onChange={this.handleTextChange}
                ></textarea>
                <button className="add-button" onClick={this.handleTaskAdd}>Add</button>
            </div>
            <TodoGrid todolist={this.state.filteredTodoList} deleteTodo={this.handleDeleteTodo} changeType={this.handleChangeType} />
            <div className="filter">
                <span className="filter-btn" onClick={this.filterAll}>All</span>
                <span className="filter-btn" onClick={this.filterNew}>New</span>
                <span className="filter-btn" onClick={this.filterComplited}>Completed</span>
            </div>
            
        </div>)
    }
}

export default TodoApp;