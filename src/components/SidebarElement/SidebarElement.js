import React, { Component } from 'react';

import css from './SidebarElement.css';

import { Scrollbars } from 'react-custom-scrollbars';

class SidebarElement extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.toggleExpand = this.toggleExpand.bind(this);
    }

    toggleExpand() {
        this.props.onElementHeaderClicked()
    }

    render() { 
        return ( 
            <div className={"sidebar-element" + (this.props.expanded ? ' expanded ' : '')}>
                <div className="header" onClick={this.toggleExpand}>
                    <div className="title">{this.props.title}</div>
                </div>
                <Scrollbars  renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>} autoHide={true} className="body">
                        {this.props.children}
                </Scrollbars>
            </div>
         );
    }
}
 
export default SidebarElement;