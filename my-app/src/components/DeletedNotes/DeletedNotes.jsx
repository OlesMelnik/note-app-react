
import React from "react";

import './DeletedNotes.css';
import Note from "../Note/Note.jsx";
import Masonry from "masonry-layout";

import { connect } from "react-redux";
import { removeFromBasket,restoreNote } from "../../redux/actions";


var data = JSON.parse(localStorage.getItem("basket"));


class DeletedNotes extends React.Component {

    constructor() {
        super();
        //this.state = { notes: data };
        //this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }

    componentDidMount() {

        var grid = this.refs.grid;

        this.msnry = new Masonry(grid, {
            // options
            itemSelector: '.note',
            percentPosition: true,
            columnWidth: 200,
            gutter: 10
        });
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.basket.length !== prevProps.basket.length) {
            // this.setState({ notes: this.props.notes }, () => {
                
            // });
            this.msnry.reloadItems();
                this.msnry.layout();
        }
        // if (this.state.notes.length !== prevState.notes.length) {
        //     this.msnry.reloadItems();
        //     this.msnry.layout();
        // }
    }

    handleDeleteNote(note) {
        var noteId = note.id;
        console.log(noteId);
        let newBasket= this.props.basket.filter(function (obj) {
            console.log("id",note.id);
            return obj.id != noteId;
        });
        console.log('new basket', newBasket);
        localStorage.setItem("basket", JSON.stringify(newBasket));
        this.props.removeFromBasket(noteId);
    }

    handleRestoreNote(note){
        console.log("restore");
        var noteId = note.id;
        
        let newBasket= this.props.basket.filter(function (obj) {
            return obj.id != noteId;
        });
        this.props.restoreNote(note);
        let newNotes = this.props.notes.slice();
        newNotes.unshift(note);
        console.log("new notes", newNotes);
        console.log("basket", newBasket);
        localStorage.setItem("notes", JSON.stringify(newNotes));
        localStorage.setItem("basket", JSON.stringify(newBasket));
    }


    render() {
        return (<div>
            <div className="notes-grid" ref="grid">

                {
                    this.props.basket.map((note) => {
                        return <Note
                            key={note.id}
                            id={note.id}
                            color={note.color}
                            text={note.text}
                            isImage={note.isImage}
                            imageSrc={note.imageSrc}
                            basket={true}
                            onDelete={() => this.handleDeleteNote(note)}
                            onRestore={() => this.handleRestoreNote(note)}
                        />
                    })
                }
            </div></div>)
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        notes: state.notes,
        basket: state.basket
    }
}

export default connect(
    mapStateToProps,
    { removeFromBasket, restoreNote }
)(DeletedNotes);

// export default DeletedNotes;