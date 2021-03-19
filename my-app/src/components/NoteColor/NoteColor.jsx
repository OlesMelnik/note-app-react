import React from "react";
import './NoteColor.css';

class NoteColor extends React.Component{

    render() {
        let colors = ["#00ff00", "#00ffff", "#ff0000", "#ffff00", "#ff00ff", "#ff9900"];
        return (
            <div className="colors-list">
                {
                    colors.map((el, i) => {
                        return (
                            <div key={i} style={{backgroundColor: el}}>
                                <input
                                    className="radio-custom"
                                    id={el}
                                    type="radio"
                                    name="color"
                                    onChange={(e)=>this.props.onColorChanged(e, el)}
                                />
                                <label className="radio-custom-label" htmlFor={el}/>
                            </div>
                        );
                    })
                }
                
                <label className="color-picker" htmlFor="color-picker"><i className="fas fa-eye-dropper"></i>
                <input type="color" id="color-picker" value="#ff0000" onChange={(e) => this.props.onColorChanged(e, e.target.value)}/></label>
                
            </div>
        );
    }
}

export default NoteColor;