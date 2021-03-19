import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import AboutPage from "./components/AboutPage/AboutPage.jsx";
import NotesPage from "./components/NotesPage/NotesPage.jsx";
import TodoPage from "./components/TodoPage/TodoPage.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";
import Menu from "./components/Menu/Menu.jsx";
import DeletedNotes from "./components/DeletedNotes/DeletedNotes.jsx";



class App extends React.Component {
    render() {
        return <div className="container">
            <Router>
                <Menu />
                <div className="appContainer">
                    <Switch>
                        <Route exact path="/" component={AboutPage} />
                        <Route path="/about" component={AboutPage} />
                        <Route path="/notes" component={NotesPage} />
                        <Route path="/todo" component={TodoPage} />
                        <Route path="/basket" component={DeletedNotes} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        </div>
    }
}

export default App;