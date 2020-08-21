import React, { Component, Children } from 'react';

import iconForFile from './fileIcons';

import css from './FileExplorer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {

        return ( 
            <div className="directory-tree">
                <TreeDirectory directoryName={this.props.fileName}  structure={buildFileStructure(this.props.files)}/>
            </div>
         );
    }
}

class TreeDirectory extends Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false }

        this.toggleExpandDirectory = this.toggleExpandDirectory.bind(this);
    }

    toggleExpandDirectory () {
        this.setState((state) => ({ expanded: !(state.expanded===true) }));
    }

    render() { 

        let children = Object.keys(this.props.structure).sort().map((key, index) => {
            let section = this.props.structure[key];
            if(section.__isDirectory)
                return <TreeDirectory key={index} directoryName={key} structure={section}/>
            else
                return <TreeFile key={index} fileName={key}/>
        });

        return ( 
            <div className={"directory" + (this.state.expanded ? ' expanded ' : '')}>
                <div className="header" onClick={this.toggleExpandDirectory}>
                    <div className="icon">
                        <FontAwesomeIcon icon={this.state.expanded ? faAngleDown : faAngleRight}/>
                    </div>
                    <span className="directory-name">
                        {this.props.directoryName}
                    </span>
                </div>
                <div className="body">
                    {children}
                </div>
            </div>
         );
    }
}
 
class TreeFile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="file">
                <div className="icon">
                    <img src={iconForFile(this.props.fileName)} alt="" className="fileIcon"/>
                </div>
                <span className="file-name">
                    {this.props.fileName}
                </span>
            </div>
         );
    }
}

export default Tree;

function buildFileStructure(files) {
    console.log(files);
    let fileStructure = Object.defineProperty({}, '__isDirectory', {
        value: true
    });
    for (let filepath in files) {
        if(files[filepath].dir == true)
            continue;
        let segments = filepath.split('/');
        segments.reduce((previous, current, index) =>
            previous[current] ? previous[current] :
            previous[current] = Object.defineProperty(index == segments.length - 1 ? files[filepath] : {}, '__isDirectory', {
                value: index != segments.length - 1
            }), fileStructure);
    }
    return fileStructure;
}