import React, { Component } from "react";

import css from "./SideBar.css";

import FileExplorer from "../FileExplorer";
import ResourceExplorer from "../ResourceExplorer/ResourceExplorer";
import Toc from "../Toc";
import Spine from "../Spine";

import views from "../../libs/views";

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = { expandedElementId: 0 };
		this.onElementHeaderClicked = this.onElementHeaderClicked.bind(this);
	}

	onElementHeaderClicked(id) {
		if (this.state.expandedElementId == id) this.setState({ expandedElementId: -1 });
		else this.setState({ expandedElementId: id });
	}

	render() {
		return (
			<div className="sidebar">
				{[
					["toc", <Toc toc={this.props.book?.navigation?.toc} />],
					["spine", <Spine spine={this.props.book?.spine} />],
					["fileExplorer", <FileExplorer changeOpenFile={this.props.changeOpenFile} book={this.props.book} />],
					["resourceExplorer", <ResourceExplorer resources={this.props.book.resources} />],
				].map(
					([elementName, element], index) =>
						views[this.props.activeViewId].sidebarElements?.includes(elementName) &&
						React.cloneElement(element, {
							key: index,
							expanded: this.state.expandedElementId == index,
							onElementHeaderClicked: () => this.onElementHeaderClicked(index),
							changeOpenFile: this.props.changeOpenFile,
						})
				)}
			</div>
		);
	}
}

export default SideBar;
