import React, { Component } from 'react';

import css from './SideBar.css';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = { expandedElementKey: 0 }
    }

    onElementHeaderClicked(key){
        if(this.state.expandedElementKey == key)
            this.setState({ expandedElementKey: -1 });
        else
            this.setState({ expandedElementKey: key });
    }

    render() { 
        const children = React.Children.map(this.props.children, (child, key) => {
            // checking isValidElement is the safe way and avoids a typescript error too
            const props = { expanded: key == this.state.expandedElementKey, onElementHeaderClicked: ()=>this.onElementHeaderClicked(key) };
            if (React.isValidElement(child)) {
                return React.cloneElement(child, props);
            }
            return child;
        });

        return ( 
            <div className="sidebar">
                {children}
            </div>
         );
    }
}
 
export default SideBar;