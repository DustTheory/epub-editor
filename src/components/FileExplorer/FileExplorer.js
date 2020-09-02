import React, { Component } from "react";

import SidebarElement from "../SidebarElement";

import TreeExplorer from "../TreeExplorer";
import { file } from "jszip";

import _ from 'lodash';

/**
 * File explorer sidebar element component. Built on top of TreeExplorer component.
 */

class FileExplorer extends Component {
	constructor(props) {
		super(props);
		this.state = { structure: {}, currentlyOpenFileUrl: '' }
		this.onClickFile = this.onClickFile.bind(this);
	}

	componentDidUpdate(){
		if(this.state.currentlyOpenFileUrl != this.props.openFileUrls.absoluteUnanchored.substr(1)){
			let files = this.props.book?.archive?.zip?.files || {};
			buildFileStructure(files, this.props.openFileUrls.absoluteUnanchored.substr(1)).then(structure => {
				this.setState({ structure: structure, currentlyOpenFileUrl: this.props.openFileUrls.absoluteUnanchored.substr(1) });
			});
		}
	}

	onClickFile(name, structure) {
		this.props.changeOpenFile(structure.name);
	}

	render() {
		return (
			<SidebarElement
				expanded={this.props.expanded && Object.keys(this.state.structure).length > 0}
				onElementHeaderClicked={this.props.onElementHeaderClicked}
				title="Explorer">
				<TreeExplorer
					onClickFile={this.onClickFile}
					rootDirName={this.props.book?.package?.metadata?.title}
					structure={this.state.structure}
				/>
			</SidebarElement>
		);
	}
}

export default FileExplorer;

/**
 * Turns jszip files object into a tree structure directory hierarchy compatible with TreeExplorer.
 * @param {object} files 
 */
async function buildFileStructure(files, currentlyOpenFileUrl) {
	await clearStructure(files);
	let fileStructure = Object.defineProperties({},  {
		__isDirectory: { value: true, configurable: true },
		__extraData: { value: { isCurrentlyOpen: true }, configurable: true }
	});
	let buildTree = async (segments, segmentIndex, node, file) => {
		let currSegment = segments[segmentIndex];
		let isDirectory = segmentIndex != segments.length - 1;
		let isOpen = false;
		node[currSegment] = !isDirectory ? file : node[currSegment] || {};
		if(isDirectory)
			isOpen = await buildTree(segments, segmentIndex+1, node[currSegment], file);
		else
			isOpen = file.name == currentlyOpenFileUrl;
		node[currSegment] = Object.defineProperties(node[currSegment],  {
			__isDirectory: { value: isDirectory, configurable: true },
			__extraData: { value: { isCurrentlyOpen: node[currSegment].__extraData?.isCurrentlyOpen || isOpen }, configurable: true }
		});
		return isOpen;
	}
	for (let filepath in files) {
		if (files[filepath].dir == true) continue;
		let segments = filepath.split("/");
		await buildTree(segments, 0, fileStructure, files[filepath]);
	}
	return fileStructure;
}

async function clearStructure(structure){
	if(structure._data)
		structure = Object.defineProperties(structure, {
			__isDirectory: { value: undefined, configurable: true },
			__extraData: { value: undefined , configurable: true }
		});
	else
		Object.values(structure).forEach(async child => await clearStructure(child));
}
