import React, { Component } from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

var beautify_js = require("js-beautify").js;
var beautify_css = require("js-beautify").css;
var beautify_html = require("js-beautify").html;
var beautify_xml = require("xml-beautifier");

import css from "./CodeEditor.css";
import { file } from "jszip";

let reader = new FileReader();

class CodeEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.showOpenFile = this.showOpenFile.bind(this);
		this.showOpenFile();
	}

	componentDidUpdate() {
		this.showOpenFile();
	}

	showOpenFile() {
		if (this.props.file) {
			let filename = this.props.file.name;
			if (filename != this.state.filename)
				this.props.file.async("text").then((fileContent) => {
					let filenameExtension = filename.split(".").slice(-1)[0];
					if (["html", "xhtml", "htm"].includes(filenameExtension)) fileContent = beautify_html(fileContent);
					else if (filenameExtension == "xml") fileContent = beautify_xml(fileContent);
					else if (filenameExtension == "js") fileContent = beautify_js(fileContent);
					else if (filenameExtension == "css") fileContent = beautify_css(fileContent);
					this.setState({ fileContent: fileContent, filename: filename });
				});
		}
	}

	render() {
		return (
			<div style={this.props.visible ? {} : { display: "none" }} className="code-editor">
				<AceEditor
					mode="html"
					theme="github"
					name={"ace-editor"}
					editorProps={{
						$blockScrolling: true,
					}}
					value={this.state.fileContent}
					setOptions={{
						enableBasicAutocompletion: true,
						enableLiveAutocompletion: true,
						enableSnippets: true,
					}}
					width="100%"
					height="100%"
					wrapEnabled={true}
				/>
			</div>
		);
	}
}

export default CodeEditor;
