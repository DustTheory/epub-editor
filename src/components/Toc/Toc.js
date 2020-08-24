import React, { Component } from 'react';

import SidebarElement from '../SidebarElement';
import TreeExplorer from '../TreeExplorer';

class Toc extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.onClickItem = this.onClickItem.bind(this);
    }

    async onClickItem(name, structure){
        let url = decodeURI(this.props.book.resolve(structure.__extraData.href).substr(1).split('#')[0])
        let anchor = decodeURI(structure.__extraData.href.split('#').slice(-1)[0]);
        let file = await this.props.book.archive.zip.file(url);
        this.props.changeOpenFile(name, file, anchor);
    }

    render() { 
        let structure = buildTreeStructure(this.props.toc);
        return ( 
            <SidebarElement expanded={this.props.expanded && Object.keys(structure).length > 0} onElementHeaderClicked={this.props.onElementHeaderClicked} title="Table of contents">
                <TreeExplorer onClickFile={this.onClickItem} onClickDirectory={this.onClickItem} structure={structure}/>
            </SidebarElement>
         );
    }
}
 
export default Toc;

function buildTreeStructure(toc){

    function newNavPoint(el) {
        let navPoint = buildTree(el.subitems);
        Object.defineProperty(navPoint, '__extraData', {
            value: {
                id: el.id,
                href: el.href,
                lockExpanded: true,
                noIcon: true
            }
        });
        return navPoint;
    }


    function buildTree(arr){
        let tree = Object.defineProperty({}, '__isDirectory', {
            value: true
        });
        arr.forEach(el => {
            tree[el.label] = newNavPoint(el);
        });
        return tree;
    }

    return buildTree(toc);
}
