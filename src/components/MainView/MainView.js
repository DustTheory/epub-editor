import React, { Component } from 'react';

import css from './MainView.css';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div id="main-view" className="main-view">
                {this.props.children}   
            </div>
        );
    }
}
 
export default Editor;