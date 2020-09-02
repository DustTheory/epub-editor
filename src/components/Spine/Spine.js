import React, { Component } from "react";

import SidebarElement from "../SidebarElement";
import TreeExplorer from "../TreeExplorer";
import { file } from "jszip";
import { setInterval } from "core-js";

/**
 * Sidebar element component built on top of the TreeExplorer component.
 * Lists out epubjs Book spine.
 */

class SpineExplorer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onClickItem = this.onClickItem.bind(this);
		this.buildTreeStructure = this.buildTreeStructure.bind(this);
	}

	onClickItem(name, structure) {
		this.props.changeOpenFile(structure.href);
	}

	/**
	 * Takes in epubjs Book spine array and turns it into a TreeExplorer compatible structure.
	 * @param {Array} spine 
	 */

	buildTreeStructure(spine) {
		spine = spine || [];
		let fileStructure = Object.defineProperty({}, "__isDirectory", {
			value: true,
		});
		spine.items?.forEach((item) => {
			fileStructure[item.href] = Object.defineProperty(item, "__extraData", {
				value: { isCurrentlyOpen: item.url == this.props.openFileUrls.absoluteUnanchored },
				configurable: true
			});
		});
		return fileStructure;
	}


	render() {
		let structure = this.buildTreeStructure(this.props.spine);
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
