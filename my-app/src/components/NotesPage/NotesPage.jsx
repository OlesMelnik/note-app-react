import React from "react";
import NotesApp from "../NotesApp/NotesApp.jsx";

import './NotesPage.css';


class NotesPage extends React.Component {
    render() {
        return (<div className="notes-page">
            <h2 className="notes-header">Gogle Notes Here</h2>
            <NotesApp />
        </div>)
    }
}

export default NotesPage;