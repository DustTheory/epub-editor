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

/**
 * Code editor view component. Uses ace editor.
 */

class CodeEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.showOpenFile = this.showOpenFile.bind(this);
	}

	componentDidMount(){
		this.showOpenFile();
	}

	componentDidUpdate() {
		this.showOpenFile();
	}

	/**
	 * Loads open file in code editor if it hasn't already been loaded.
	 */

	async showOpenFile() {
		// If no file has been provided or file has already been loaded.
		if (!this.props.file || this.state.filename == this.props.file.name)
			return;

		let beautify = (fileContent, filename) =>  {
			let filenameExtension = filename.split(".").slice(-1)[0];
			let extensionBeautifierMap = {
				'xml': beautify_xml,
				'js': beautify_js,
				'css': beautify_css,
				'html': beautify_html,
				'xhtml': beautify_html,
				'htm': beautify_html
			};
			return (extensionBeautifierMap[filenameExtension])(fileContent);
		};

		let fileContent = await this.props.file.async("text");
		this.setState({ fileContent: beautify(fileContent, this.props.file.name), filename: this.props.file.name });

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
