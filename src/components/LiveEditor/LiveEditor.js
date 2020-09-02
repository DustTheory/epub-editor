import React, { Component } from "react";
import ReactDOM from "react-dom";

import classNames from 'classnames';
import Frame from 'react-frame-component';
import CkEditor from "ckeditor4-react";

import ProgressIndicatorH from '../ProgressIndicatorH';
import css from "./LiveEditor.css";

/**
 * WYSIWYG html editor view component. Editor used is ckeditor4 and is wrapped in an iframe.
 */

class LiveEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.editorIframeRef = React.createRef();
		this.hProgressIndicatorRef = React.createRef();

		this.showOpenFile = this.showOpenFile.bind(this);
		this.onBeforeCkLoad = this.onBeforeCkLoad.bind(this);
		this.scrollAnchorIntoView = this.scrollAnchorIntoView.bind(this);
		this.scrollEditorToTop = this.scrollEditorToTop.bind(this);
	}

	componentDidUpdate() {
		this.showOpenFile();
		this.scrollAnchorIntoView(this.props.openFileUrls.anchor);
	}

	/**
	 * Scrolls anchor in rendered section into view.
	 * Anchor is anchor html element id.
	 * @param {string} anchor 
	 */

	scrollAnchorIntoView(anchor){
		this.editorInstance?.document.$.getElementById(anchor)?.scrollIntoView(true);
	}

	/**
	 * Resets view by scrolling the editor to the top of the loaded book section.
	 * This is mainly done when jumping to a new chapter.
	 */

	scrollEditorToTop(){
		let iframeDoc = this.editorIframeRef.current.node.contentDocument;
		iframeDoc.scrollingElement.scrollTop = 0; 	
	}

	/**
	 * Loads open book section content into editor if it hasn't already been loaded.
	 */

	async showOpenFile() {
		// If no file has been passed or the newly opened file isn't a part of the book's spine or an attempt is made to show already open file.
		if (!this.props.file || !this.props.openFileUrls.contentAnchored || this.props.file.name === this.state.filename) 
			return;

		let filename = this.props.file.name;
		let sectionUrl = this.props.openFileUrls.contentAnchored;
		let request = this.props.book.load.bind(this.props.book);
		let content = await this.props.book.spine.get(sectionUrl)?.render(request);
		if(!content)
			return;
		this.setState((state) => ({ fileContent: content, filename: filename }), this.scrollEditorToTop);
	}

	/**
	 * Runs before ckeditor is loaded.
	 * When editor instance loads, save a reference to it to this.editorInstance. 
	 * @param {object} CKEDITOR 
	 */
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
				<Frame ref={this.editorIframeRef}>
					{/* Hacky but short and library free way to add a <style> element into dom in react */}
					<style dangerouslySetInnerHTML={{__html: `
						html {
							-ms-overflow-style: none;
							scrollbar-width: none;
						}

						html::-webkit-scrollbar::-webkit-scrollbar {
							display: none;
						}

					`}} />
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
				</Frame>
				<ProgressIndicatorH refresh={this.state.refresh} section={this.props.section} loadNextSection={this.props.loadNextSection} loadPrevSection={this.props.loadPrevSection} firstSection={this.props.section==0} lastSection={this.props.section == this.props.nSections-1} scrollElement={this.editorIframeRef.current?.node?.contentDocument} ref={this.hProgressIndicatorRef} />
			</div> 
		);
	}
}

export default LiveEditor;
