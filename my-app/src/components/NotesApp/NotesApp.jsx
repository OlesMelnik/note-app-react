
import React from "react";

import './NotesApp.css';

import NoteEditor from "../NoteEditor/NoteEditor.jsx";
import NotesGrid from "../NotesGrid/NotesGrid.jsx";

import { connect } from "react-redux";
import { addNote, deleteNote } from "../../redux/actions";


// const data = [
//     {
//         id: 1,
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
//         color: "red",
//         tags: "#lorem",
//         isImage: false,
//         imageSrc: ''
//     },
//     {
//         id: 2,
//         text: "Lorem ipsum dolor sit",
//         color: "green",
//         tags: "#lorem",
//         isImage: false,
//         imageSrc: ''
//     },
//     {
//         id: 3,
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing",
//         color: "gray",
//         tags: "#lorem",
//         isImage: false,
//         imageSrc: ''
//     },
//     {
//         id: 4,
//         text: "Lorem ipsum dolor",
//         color: "yellow",
//         tags: "#lorem",
//         isImage: false,
//         imageSrc: ''
//     },
//     {
//         id: 5,
//         text: "Lorem ipsum",
//         color: "violet",
//         tags: "#lorem",
//         isImage: false,
//         imageSrc: ''
//     },
//     {
//         id: 6,
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//         color: "orange",
//         tags: "#lorem",
//         isImage: false,
//         imageSrc: ''
//     },
//     {
//         id: 7,
//         text: "Lorem ipsum dolor sit amet",
//         color: "blue",
//         tags: "#lorem",
//         isImage: false,
//         imageSrc: ''
//     },

// ];

// const data = [
//         {
//             id: 1,
//             text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
//             color: "red",
//             tags: "#lorem",
//             isImage: false,
//             imageSrc: ''
//         },
//         {
//             id: 2,
//             text: "Lorem ipsum dolor sit",
//             color: "green",
//             tags: "#lorem",
//             isImage: false,
//             imageSrc: ''
//         },];

// localStorage.setItem("notes", JSON.stringify(data));

var data = JSON.parse(localStorage.getItem("notes"));
// localStorage.setItem("basket",JSON.stringify(data1));


class NotesApp extends React.Component {


    constructor() {
        super();
        this.state = {notes: data}
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);

    }

    handleNoteAdd(newNote) {
        let newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({notes: newNotes});
        console.log("new note", newNote);
        this.props.addNote(newNote);
        localStorage.setItem("notes", JSON.stringify(newNotes));
    }

    handleDeleteNote(note){
        let noteId = note.id;
        let newNotes = this.state.notes.filter(function (note) {
            return note.id != noteId;
        });
        this.setState({
            notes: newNotes
        })
        note.basket = true;
        localStorage.setItem("notes", JSON.stringify(newNotes));
        var basket = JSON.parse(localStorage.getItem("basket"));
        basket.push(note);
        console.log("note", note);
        this.props.deleteNote(note);
        localStorage.setItem("basket", JSON.stringify(basket));
    }



    render() {
        return (<div className="notes-app">
            <NoteEditor onNoteAdd={this.handleNoteAdd} />
            <NotesGrid notes={this.props.notes} onNoteDelete={this.handleDeleteNote}/>
        </div>)
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    notes: state.notes
  }
}

//export default NotesApp;
export default connect(
    mapStateToProps,
    { addNote, deleteNote }
  )(NotesApp);