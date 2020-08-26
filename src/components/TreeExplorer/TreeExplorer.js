import React, { Component, Children } from "react";

import iconForFile from "../../libs/icons";

import css from "./TreeExplorer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";

class TreeExplorer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="tree-explorer">
				<TreeDirectory
					onClickDirectory={this.props.onClickDirectory}
					onClickFile={this.props.onClickFile}
					hideHeader={!this.props.rootDirName}
					directoryName={this.props.rootDirName}
					structure={this.props.structure}
				/>
			</div>
		);
	}
}

class TreeDirectory extends Component {
	constructor(props) {
		super(props);
		this.state = { expanded: !!this.props.hideHeader };

		this.toggleExpandDirectory = this.toggleExpandDirectory.bind(this);
		this.onClickDirectory = this.onClickDirectory.bind(this);
	}

	onClickDirectory(e) {
		this.toggleExpandDirectory();
		if (this.props.onClickDirectory) this.props.onClickDirectory(this.props.directoryName, this.props.structure);
	}

	toggleExpandDirectory() {
		this.setState((state) => ({ expanded: !(state.expanded === true) }));
	}

	render() {
		let children = Object.keys(this.props.structure).map((key, index) => {
			let section = this.props.structure[key];
			if (section.__isDirectory)
				return (
					<TreeDirectory
						key={index}
						onClickFile={this.props.onClickFile}
						onClickDirectory={this.props.onClickDirectory}
						noIcon={section.__extraData?.noIcon}
						lockExpanded={section.__extraData?.lockExpanded}
						key={index}
						directoryName={key}
						structure={section}
					/>
				);
			else return <TreeFile key={index} onClickFile={this.props.onClickFile} onkey={index} fileName={key} file={section} />;
		});

		return (
			<div className={"directory" + (this.state.expanded || this.props.lockExpanded ? " expanded " : "")}>
				{!this.props.hideHeader && (
					<div className="header" onClick={this.onClickDirectory}>
						{this.props.noIcon || (
							<div className="icon">
								<FontAwesomeIcon icon={this.state.expanded ? faAngleDown : faAngleRight} />
							</div>
						)}
						<span className="directory-name">{this.props.directoryName}</span>
					</div>
				)}
				<div className="body">{children}</div>
			</div>
		);
	}
}

class TreeFile extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.onClickFile = this.onClickFile.bind(this);
	}
	onClickFile() {
		if (this.props.onClickFile) {
			this.props.onClickFile(this.props.fileName, this.props.file);
		}
	}
	render() {
		return (
			<div className="file" onClick={this.onClickFile}>
				<div className="icon">
					<img src={iconForFile(this.props.fileName)} alt="" className="fileIcon" />
				</div>
				<span className="file-name">{this.props.fileName}</span>
			</div>
		);
	}
}

export default TreeExplorer;
