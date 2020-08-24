import React, { Component } from 'react';

import css from './WelcomeScreen.css';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="welcome-screen">
                <div className="vertical-center">
                    <div className="content">
                        <h1>FAEG</h1>
                        <h2>Fast Assisted Epub Generator</h2>
                        <h3>Start</h3>
                        <a href="#">Create new book</a>
                        <a onClick={this.props.loadEpubFile} href="#">Load existing book</a>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default WelcomeScreen;