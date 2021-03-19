
import React from "react";

import './NotesGrid.css';

import Note from "../Note/Note.jsx";
import Masonry from "masonry-layout";

import { connect } from "react-redux";



class NotesGrid extends React.Component {



    constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.state = {notes: this.props.notes};
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }
    
    componentDidMount() {

        var grid = this.refs.grid;
        
        this.msnry = new Masonry( grid, {
            // options
            itemSelector: '.note',
            percentPosition: true,
            columnWidth: 200,
            gutter: 20
          });
    }


    componentDidUpdate(prevProps, prevState) {
        if(this.props.notes.length !== prevProps.notes.length) {
            this.setState({notes: this.props.notes},() =>{
                this.msnry.reloadItems();
                this.msnry.layout();
            });
        }
        if(this.state.notes.length !== prevState.notes.length){
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    }

    filter(e){
        if(e.target.value[0] == "#"){
            let filteredList = this.props.notes.filter((note) => {
                return note.tags.toLowerCase().search(e.target.value.toLowerCase()) !== -1});
                this.setState({notes: filteredList});
        }
        else{
            let filteredList = this.props.notes.filter((note) => {
                return note.text.toLowerCase().search(e.target.value.toLowerCase()) !== -1});
                this.setState({notes: filteredList});
        }
    }

    handleDeleteNote(){
        this.props.onNoteDelete();
    }



    render() {
        console.log("mynotes",this.props.myNotes);
        return (<div><input placeholder="search" className="noteSearch" onInput={this.filter}/>
        <div className="notes-grid" ref="grid">
            
            {
                this.state.notes.map((note) => {
                    return <Note
                        key={note.id}
                        id={note.id}
                        color={note.color}
                        text={note.text}
                        isImage={note.isImage}
                        imageSrc={note.imageSrc}
                        changeColor={true}
                        onDelete={this.props.onNoteDelete.bind(null, note)}
                    />
                })
            }
        </div></div>)
    }
    
}

const mapStateToProps = state => {
    return { myNotes: state };
    //   const allTodos = getTodos(state);
    //   return {
    //     todos:
    //       visibilityFilter === VISIBILITY_FILTERS.ALL
    //         ? allTodos
    //         : visibilityFilter === VISIBILITY_FILTERS.COMPLETED
    //           ? allTodos.filter(todo => todo.completed)
    //           : allTodos.filter(todo => !todo.completed)
    //   };
  };

// export default NotesGrid;
export default connect(mapStateToProps)(NotesGrid);