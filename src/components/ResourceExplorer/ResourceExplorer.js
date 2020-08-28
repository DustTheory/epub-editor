import React, { Component } from "react";

import SidebarElement from "../SidebarElement";
import TreeExplorer from "../TreeExplorer";

import css from "./ResourceExplorer.css";
import Urls from "../../libs/Urls";

/**
 * Sidebar element component that shows all book resources by category.
 */

class ResourceExplorer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onClickFile = this.onClickFile.bind(this);
	}

	async onClickFile(filename, structure) {
		this.props.changeOpenFile(structure.href);
	}

	render() {
		let structure = buildTreeStructure(this.props.resources || []);
		return (
			<SidebarElement expanded={this.props.expanded} onElementHeaderClicked={this.props.onElementHeaderClicked} title="Resources">
				<TreeExplorer onClickFile={this.onClickFile} structure={structure} />
			</SidebarElement>
		);
	}
}

export default ResourceExplorer;

/**
 * Generates and returns a TreeExplorer compatible structure from an epubjs Book resources object.
 * @param {object} resources 
 */

function buildTreeStructure(resources) {
	function newFolder() {
		return Object.defineProperty({}, "__isDirectory", {
			value: true,
		});
	}

	function fillFolder(items) {
		items = items || [];
		let folder = newFolder();
		items.forEach((item) => {
			let filename = item.href.split("/").slice(-1)[0];
			folder[filename] = item;
		});
		return folder;
	}

	let fileStructure = newFolder();

	fileStructure["Assets"] = fillFolder(resources.assets);
	fileStructure["Style"] = fillFolder(resources.css);
	fileStructure["Content"] = fillFolder(resources.html);

	return fileStructure;
}
