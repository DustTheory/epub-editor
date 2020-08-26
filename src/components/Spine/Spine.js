import React, { Component } from "react";

import SidebarElement from "../SidebarElement";
import TreeExplorer from "../TreeExplorer";
import { file } from "jszip";
import { setInterval } from "core-js";

class SpineExplorer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onClickItem = this.onClickItem.bind(this);
	}

	onClickItem(name, structure) {
		this.props.changeOpenFile(structure.href);
	}

	render() {
		let structure = buildTreeStructure(this.props.spine);
		return (
			<SidebarElement
				expanded={this.props.expanded && Object.keys(structure).length > 0}
				onElementHeaderClicked={this.props.onElementHeaderClicked}
				title="Spine">
				<TreeExplorer onClickFile={this.onClickItem} onClickDirectory={this.onClickItem} structure={structure} />
			</SidebarElement>
		);
	}
}

export default SpineExplorer;

function buildTreeStructure(spine) {
	spine = spine || [];
	let fileStructure = Object.defineProperty({}, "__isDirectory", {
		value: true,
	});
	spine.items?.forEach((item) => {
		fileStructure[item.href] = item;
	});
	return fileStructure;
}
