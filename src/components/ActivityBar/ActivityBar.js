import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import css from './ActivityBar.css';

const Tooltip = (props) => {
    return ( 
        <div className="tooltip-text">
            {props.text}
        </div>
     );
}
 
class ViewIcon extends Component {
    constructor(props) {
        super(props);
        
        // Randomized id used for radio input and it's label
        this.id = 'activity-bar-icon-' + Math
            .random()
            .toString(36)
            .substr(2, 4);
    }

    render() {
        return (
            <div className={"icon tooltip" + (this.props.active ? ' active ' : ' ')}>
                <input checked={this.props.active} onChange={this.props.onViewChange} type="radio" value={this.props.viewId} id={this.id} name="activity-bar-state"/>
                <label htmlFor={this.id}>
                    <FontAwesomeIcon className="fa-2x" icon={this.props.icon}/>
                </label>
                <Tooltip text={this.props.tooltipText}/>
            </div>
        );
    }
}

class ActivityBar extends Component {
    constructor(props) {
        super(props);

        this.onViewChange = this.onViewChange.bind(this);
    }

    onViewChange(e) {
        let viewId = e.target.value;
        this.props.onViewChange(viewId);
    }

    render() {
        let viewIcons = Object.values(this.props.views).map( view => 
            <ViewIcon key={view.id} viewId={view.id} icon={view.icon} active={this.props.activeView == view.id} onViewChange={this.onViewChange} tooltipText={view.name}/>
        );

        return (
            <div className="activity-bar">
                {viewIcons}
            </div>
        );
    }
}

export default ActivityBar;