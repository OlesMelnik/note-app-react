
import React from "react";

import './Note.css';

import { connect } from "react-redux";
import { setColor } from "../../redux/actions";


function NoteImage(props) {
    console.log(props.isImage);
    if (props.isImage) {
      return <img className="note-image"src={props.imageSrc}/>
    }
    else
        return '';
}

function RestoreNote(props){
    if(props.basket){
        return <span className="note-restore" onClick={props.onRestore}><i className="fas fa-trash-restore"></i></span>
    }
    else
        return '';
}

function SelectColor(props){
    if(props.color){
        let colors = ["#00ff00", "#00ffff", "#ff0000", "#ffff00", "#ff00ff", "#ff9900"];
        return (
            <div className="color-list">
                {
                    colors.map(color => {
                        return (<div className="color-btn" key={color} style={{backgroundColor: color}} onClick={() => props.changeColor(color)}></div>
                    )})
                }
            </div>
        );
    }
    else
        return '';
}

function ColorButton(props){
    if(props.changeColor){
        return <span className="note-color" onClick={props.showColors}><i className="fas fa-palette"></i></span>
    }
    else
        return '';
}

class Note extends React.Component {
    constructor(props){
        super(props);
        this.state = {color: false};
        this.handleColor = this.handleColor.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    handleColor(){
        this.setState({color: !this.state.color});
    }

    changeColor(color){
        this.setState({color: !this.state.color});
        this.props.setColor(this.props.id, color);
        console.log(this.props.id);
        let notes = JSON.parse(localStorage.getItem("notes"));
        var foundIndex = notes.findIndex(x => x.id == this.props.id);
        notes[foundIndex].color = color;
        localStorage.setItem("notes", JSON.stringify(notes));

    }
    render() {
        return (
        <div className="note" style={{backgroundColor: this.props.color}}>
            <NoteImage isImage = {this.props.isImage} imageSrc = {this.props.imageSrc}/>
           <span className="delete-note" onClick={this.props.onDelete}>×</span>
               <span className="note-text">{this.props.text}</span>
               <ColorButton changeColor = {this.props.changeColor} showColors={this.handleColor}/>
               <SelectColor color = {this.state.color} noteId = {this.props.id} changeColor={this.changeColor}></SelectColor>
               <RestoreNote basket = {this.props.basket} onRestore = {this.props.onRestore}/>
        </div>)
    }
}

export default connect(
    null,
    { setColor }
  )(Note);