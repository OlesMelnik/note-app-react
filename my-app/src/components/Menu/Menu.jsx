import React from "react";
import { NavLink }  from 'react-router-dom';
import './Menu.css';


class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {menu: true};
        this.handleMenu = this.handleMenu.bind(this);
    }

    handleMenu(){
        this.setState({menu: !this.state.menu});
    }
    render() {
        let menu_class = this.state.menu ? "menu-bar" : "hide";
        return (<nav>
            <div className="menu">
                <div className={menu_class}>
                    <div className="menu-item">
                        <NavLink className="menu-item-link" activeClassName="active"  to="/about">About</NavLink>
                    </div>
                    <div className="menu-item">
                        <NavLink className="menu-item-link" activeClassName="active"  to="/notes"><i className="fas fa-sticky-note"></i> Notes</NavLink>
                    </div>
                    <div className="menu-item">
                        <NavLink className="menu-item-link" activeClassName="active"  to="/todo"><i className="fas fa-th-list"></i> Todo </NavLink>
                    </div>
                    <div className="menu-item">
                        <NavLink className="menu-item-link" activeClassName="active"  to="/basket"><i className="fas fa-trash"></i> Basket </NavLink>
                    </div>
                </div>
                <div className="menu-btn" onClick={this.handleMenu}><i className="fas fa-bars fa-2x"></i></div>
            </div>
        </nav>)
    }
}

export default Menu;