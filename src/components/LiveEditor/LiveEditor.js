import React, { Component } from "react";
import ReactDOM from "react-dom";

import CkEditor from "ckeditor4-react";

import css from "./LiveEditor.css";

class LiveEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.showOpenFile = this.showOpenFile.bind(this);
		this.onBeforeCkLoad = this.onBeforeCkLoad.bind(this);
	}

	componentDidUpdate() {
		this.showOpenFile();
		if (this.props.openFileUrls.anchor != "")
			this.editorInstance?.document?.$?.getElementById(this.props.openFileUrls.anchor)?.scrollIntoView(true);
	}

	showOpenFile() {
		if (this.props.file) {
			let filename = this.props.file.name;
			if (filename !== this.state.filename) {
				this.props.file.async("text").then((fileContent) => {
					fileContent = swapAssetUrlsForBase64(this.props.book, fileContent);
					this.setState({ fileContent: fileContent, filename: filename });
					document.getElementById("live-editor").scrollTop = 0;
				});
			}
		}
	}

	onBeforeCkLoad(CKEDITOR) {
		CKEDITOR.on(
			"instanceReady",
			function (e) {
				this.editorInstance = e.editor;
			}.bind(this)
		);
	}

	render() {
		return (
			<div style={this.props.visible ? {} : { display: "none" }} className="live-editor-container">
				<div id="live-editor" className="live-editor">
					<CkEditor
						type={"inline"}
						data={this.state.fileContent}
						config={{
							allowedContent: true,
						}}
						onBeforeLoad={this.onBeforeCkLoad}
					/>
				</div>
			</div>
		);
	}
}

function swapAssetUrlsForBase64(book, document) {
	let newDocument = document;
	book.resources.assets.forEach((asset, index) => {
		newDocument = newDocument.replaceAll(
			new RegExp(`=("|')[^'"]*${asset.href}("|')`, "g"),
			'="' + book.resources.replacementUrls[index] + '"'
		);
	});
	return newDocument;
}

export default LiveEditor;
