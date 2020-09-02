import React, { Component } from "react";
import async from 'async';

import css from "./BookPreview.css";

import ResizeObserver from "resize-observer-polyfill";

/**
 * Book preview view component. Renders and manages epubjs Book.
 */

class BookPreview extends Component {
	constructor(props) {
		super(props);
		this.state = { bookLoadedTimestamp: new Date() };

		this.autoResizeEditor = this.autoResizeEditor.bind(this);
		this.renderBook = this.renderBook.bind(this);
		this.displayOpenSection = this.displayOpenSection.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.prevPage = this.prevPage.bind(this);
	}

	componentDidMount() {
		// Encapsulation? Just a suggestion :)
		this.mainViewElement = document.getElementById("main-view");
		this.readerRef = React.createRef();

		// Using ResizeObserver to resize rendition inside main-view element.
		// Couldn't do this better without resize-observer
		const ro = new ResizeObserver(this.autoResizeEditor);
		ro.observe(document.getElementById("main-view"));
	}

	/**
	 * Resizes reader to fit inside main-view. 
	 */
	autoResizeEditor() {
		// Skip if reader hasn't been mounted yet.
		if(!this.readerRef.current)
			return;

		// Using margin-left instead of display:none so removeProperty doesn't overwrite reader style.
		let hideReader = () => this.readerRef.current.style.marginLeft = "-99999px";
		let showReader = ()	=> this.readerRef.current.style.removeProperty("margin-left");
		
		// Hide reader to get main-view dimensions.
		hideReader();
		let dimensions = [this.mainViewElement.clientWidth * 0.8, this.mainViewElement.clientHeight * 0.8]

		// Wait until a resize event hasn't been fired for 500ms to do anything. 
		clearTimeout(this.autoResizeEditorTimeoutId);
		this.autoResizeEditorTimeoutId = setTimeout(() => {
			// Show reader again and resize
			showReader();
			this.rendition?.resize(...dimensions);
		}, 500);
	}

	/**
	 * Renders epubjs Book into reader div if it hasn't already been loaded.
	 * This is checked by comparing the timestamp of when Book had been
	 * loaded with the timestamp of when the last book that was loded into preview.
	 */
	async renderBook(){
		await this.props.book.ready;

		if (this.state.bookLoadedTimestamp.getTime() != this.props.book.loadedTimestamp.getTime()) {
			this.rendition = this.props.book.renderTo(this.readerRef.current);
			this.setState({ bookLoadedTimestamp: this.props.book.loadedTimestamp });
		}
		this.rendition.q.enqueue(this.autoResizeEditor);
	}

	/**
	 * Displays currently open section. 
	 */
	async displayOpenSection(){
		if(!this.rendition)
			return;
		let sectionUrl = this.props.openFileUrls.contentAnchored;
		if(!this.props.book.spine.get(sectionUrl)) // If section can't be found in book spine, ignore the url.
			sectionUrl = undefined;
		this.rendition.display(sectionUrl);
	}

	componentDidUpdate() {
		console.log(this.rendition)
		async.waterfall([
			this.renderBook,
			this.displayOpenSection
		]);
	}

	nextPage(){
		if(!this.rendition)
			return;
		this.rendition.next();
	//	this.props.changeOpenFile(this.rendition.location.start.cfi);
	}

	prevPage(){
		if(!this.rendition)
			return;
		this.rendition.prev();
	//	this.props.changeOpenFile(this.rendition.location.start.cfi);
	}

	render() {
		return (
			<div style={this.props.visible ? {} : { display: "none" }} className="reader" ref={this.readerRef}>
				<div className="controls">
					<a href="#" onClick={this.prevPage}>
						&lt;
					</a>
					<a href="#" onClick={this.nextPage}>
						&gt;
					</a>
				</div>
			</div>
		);
	}
}

export default BookPreview;
