import React, { Component } from 'react';

import FileExplorer from '../FileExplorer';

import css from './SideBar.css';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="sidebar">
                <FileExplorer epubFile={this.props.epubFile} onEpubFileChange={this.props.onEpubFileChange}/>
                {/* <Toc/> */}
            </div>
         );
    }
}
 
export default SideBar;