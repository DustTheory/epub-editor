import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames";

import views from "../../libs/views";

import css from "./ActivityBar.css";

const Tooltip = (props) => {
	return <div className="tooltip-text">{props.text}</div>;
};

class ViewIcon extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.changeView(this.props.viewId);
	}

	render() {
		return (
			<div
				onClick={this.onClick}
				className={classNames({
					icon: true,
					tooltip: true,
					active: this.props.active,
				})}>
				<FontAwesomeIcon className="fa-2x" icon={this.props.icon} />
				<Tooltip text={this.props.tooltipText} />
			</div>
		);
	}
}

class ActivityBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let viewIcons = Object.values(views).map(
			(view) =>
				!view.hideInNav && (
					<ViewIcon
						key={view.id}
						viewId={view.id}
						icon={view.icon}
						active={this.props.activeViewId == view.id && !this.props.sideBarHidden}
						changeView={this.props.changeView}
						tooltipText={view.name}
					/>
				)
		);

		return <div className="activity-bar">{viewIcons}</div>;
	}
}

export default ActivityBar;
