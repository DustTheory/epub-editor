import React, { Component } from "react";

import css from "./MenuBar.css";

/**
 * Menu bar component. 
 */

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

/**
 * MenuBar menu item dropdown component. 
 */

 const MenuItem = (props) => {
	 return ( 
		<div onClick={props.onItemClick} className="menu-bar-item">
			<div className="bar-item">{props.name}</div>
			<div className="dropdown">{props.children}</div>
		</div>
	  );
 }
  

/**
 * Item in MenuBar item dropdown.
 */
const DropdownItem = (props) => {
	return (
		<div onClick={props.onItemClick} className="dropdown-item">
			{props.name}
		</div>
	);
}
 

/**
 * Seperator in MenuBar item dropdown.
 */

const DropdownSeperator = () => {
	return ( <hr/> );
}