import React, { Component } from "react";

import css from "./MenuBar.css";

class MenuBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="menu-bar">
				<MenuItem name={"File"}>
					<DropdownItem name={"New book"} />
					<DropdownItem onItemClick={this.props.uploadEpubFile} name={"Open book"} />
					<DropdownSeperator />
					<DropdownItem name={"Export book"} />
				</MenuItem>
				<MenuItem name={"Edit"}></MenuItem>
				<MenuItem name={"View"}></MenuItem>
				<MenuItem name={"Help"}></MenuItem>
			</div>
		);
	}
}

export default MenuBar;

class MenuItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div onClick={this.props.onItemClick} className="menu-bar-item">
				<div className="bar-item">{this.props.name}</div>
				<div className="dropdown">{this.props.children}</div>
			</div>
		);
	}
}

class DropdownItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div onClick={this.props.onItemClick} className="dropdown-item">
				{this.props.name}
			</div>
		);
	}
}

class DropdownSeperator extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <hr />;
	}
}
