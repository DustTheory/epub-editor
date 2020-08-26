import React, { Component } from "react";

import SidebarElement from "../SidebarElement";

import TreeExplorer from "../TreeExplorer";
import Urls from "../../libs/Urls";

class FileExplorer extends Component {
	constructor(props) {
		super(props);
		this.onClickFile = this.onClickFile.bind(this);
	}

	onClickFile(name, structure) {
		this.props.changeOpenFile(structure.name);
	}

	render() {
		let files = this.props.book?.archive?.zip?.files || {};
		let structure = buildFileStructure(files);
		return (
			<SidebarElement
				expanded={this.props.expanded && Object.keys(structure).length > 0}
				onElementHeaderClicked={this.props.onElementHeaderClicked}
				title="Explorer">
				<TreeExplorer
					onClickFile={this.onClickFile}
					rootDirName={this.props.book?.package?.metadata?.title}
					structure={structure}
				/>
			</SidebarElement>
		);
	}
}

export default FileExplorer;

function buildFileStructure(files) {
	let fileStructure = Object.defineProperty({}, "__isDirectory", {
		value: true,
	});
	for (let filepath in files) {
		if (files[filepath].dir == true) continue;
		let segments = filepath.split("/");
		segments.reduce(
			(previous, current, index) =>
				previous[current]
					? previous[current]
					: (previous[current] = Object.defineProperty(index == segments.length - 1 ? files[filepath] : {}, "__isDirectory", {
							value: index != segments.length - 1,
					  })),
			fileStructure
		);
	}
	return fileStructure;
}
