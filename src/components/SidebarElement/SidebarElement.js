import React, { Component } from 'react';

import css from './SidebarElement.css'

class SidebarElement extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="sidebar-element">
                <div className="header">
                    <div className="title">{this.props.title}</div>
                    <div className="buttons">
                        {this.props.buttons}
                    </div>
                </div>
                <div className="body">
                        {this.props.children}
                </div>
            </div>
         );
    }
}
 
export default SidebarElement;