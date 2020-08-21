import React, { Component } from 'react';

import SidebarElement from '../SidebarElement';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Tree from './Tree';

class FileExplorer extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        let files = this.props.epubFile.unzipped ? this.props.epubFile.unzipped.files : {};
        let loadEpubButton = ( <LoadFileInput onFileChange={this.props.onEpubFileChange}/> );
        console.log(this.props.epubFile);
        return ( 
            <SidebarElement title="Explorer" buttons={[loadEpubButton]}>
                <Tree fileName={this.props.epubFile.fileName} files={files}/>
            </SidebarElement>
         );
    }
}

export default FileExplorer;
 
const LoadFileInput = (props) => {
    return ( 
        <div className="button">
            <input onChange={props.onFileChange} style={{ display: 'none' }} id="fileUploadBtn" type="file"/>
            <label htmlFor="fileUploadBtn">
                <FontAwesomeIcon style={{ transform: 'scale(0.95)' }}  icon={faFileUpload}/>
            </label>
        </div>
     );
}