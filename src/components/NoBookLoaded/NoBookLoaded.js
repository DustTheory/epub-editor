import React, { Component } from 'react';

import css from './NoBookLoaded.css';

class NoBookLoaded extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div style={this.props.visible ? {} : { display: "none" }} className="no-file-loaded">
                <div className="vertical-center">
					<div className="content">
						<h1>No book has been loaded</h1>
                        <h2>To access this view, please upload a valid epub file.</h2>
						<h3>Load book</h3>
						<a href="#">Create new book</a>
						<a onClick={this.props.uploadEpubFile} href="#">
							Load existing book
						</a>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default NoBookLoaded;