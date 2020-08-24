import React, { Component } from 'react';

import SidebarElement from '../SidebarElement';
import TreeExplorer from '../TreeExplorer';


import css from './ResourceExplorer.css';

class ResourceExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.onClickFile = this.onClickFile.bind(this);
    }

    async onClickFile(filename, structure){
        let url = decodeURI(this.props.book.resolve(structure.href).substr(1));
        let file = await this.props.book.archive.zip.file(url);
        this.props.changeOpenFile(filename, file);
    }

    render() { 
        let structure = buildTreeStructure(this.props?.resources || []);
        return ( 
            <SidebarElement expanded={this.props.expanded} onElementHeaderClicked={this.props.onElementHeaderClicked} title="Resources">
                <TreeExplorer onClickFile={this.onClickFile} structure={structure}/>
            </SidebarElement>
         );
    }
}
 
export default ResourceExplorer;


function buildTreeStructure(resources){

    function newFolder(){
        return Object.defineProperty({}, '__isDirectory', {
            value: true
        });
    }
    
    function fillFolder(items){
        items = items || [];
        let folder = newFolder();
        items.forEach(item => {
            let filename = item.href.split('/').slice(-1)[0];
            folder[filename] = item;
        });
        return folder;
    }

    let fileStructure =  newFolder();

    fileStructure['Assets'] = fillFolder(resources.assets);
    fileStructure['Style'] = fillFolder(resources.css);
    fileStructure['Content'] = fillFolder(resources.html);

    return fileStructure;
}