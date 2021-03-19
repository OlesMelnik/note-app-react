
import React from "react";

import './NoteEditor.css';
import NoteColors from "../NoteColor/NoteColor.jsx";


class NoteEditor extends React.Component {

    constructor() {
        super();
        this.state = {text: '', color: "yellow", tags: "", isImage: false, imageSrc:''};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this._hadleColorChange = this.hadleColorChange.bind(this);
        this.hadleTagsChange = this.hadleTagsChange.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }

    handleTextChange(event) {
        this.setState({text: event.target.value})
    }

    hadleColorChange(e, color) {
        //this.input = e.target;
        this.setState({
            color: color,
            checked: e.target.checked
        })
    }

    hadleTagsChange(e) {
        this.setState({
            tags: e.target.value
        })
    }


    handleNoteAdd() {
        var newNote = {
            id: Date.now(),
            text: this.state.text,
            color: this.state.color,
            tags: this.state.tags,
            isImage: this.state.isImage,
            imageSrc: this.state.imageSrc
        }

        this.props.onNoteAdd(newNote);
        console.log(newNote);
        this.setState({text: '', isImage: false, imageSrc: ''});
    }

    handleImage(event){
        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        reader.onload = (event) => this.setState({imageSrc: event.target.result, isImage: true});

      
        reader.readAsDataURL(selectedFile);
    }

    render() {
        return (<div className="note-editor">
            <textarea placeholder="Enter text..." value={this.state.text}rows={5} className="textarea"
            onChange={this.handleTextChange}
            ></textarea>
            <div className="controls">
                    <NoteColors onColorChanged={this._hadleColorChange}/>
                    <label htmlFor="file-selector" className="custom-file-upload">
                    <i className="far fa-file-image" ></i>
                    </label>
                    <input type="file" className="file-selector" id="file-selector" onChange={this.handleImage} accept=".jpg, .jpeg, .png"/>
                    <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
            <input placeholder="#tags" className="tags" onInput={this.hadleTagsChange}/>
        </div>)
    }
}

export default NoteEditor;