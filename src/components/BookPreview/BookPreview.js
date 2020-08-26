import React, { Component } from "react";

import css from "./BookPreview.css";

import ResizeObserver from "resize-observer-polyfill";

class BookPreview extends Component {
	constructor(props) {
		super(props);
		this.state = { bookLoadedTimestamp: new Date() };

		this.autoResizeEditor = this.autoResizeEditor.bind(this);
	}

	componentDidMount() {
		const ro = new ResizeObserver(this.autoResizeEditor);
		ro.observe(document.getElementById("main-view"));
	}

	autoResizeEditor(thing) {
		document.getElementById("reader").style.marginLeft = "-9999px";
		let mainView = document.getElementById("main-view");
		let w = mainView.clientWidth * 0.8;
		let h = mainView.clientHeight * 0.8;
		clearTimeout(this.autoResizeEditorTimeoutId);
		this.autoResizeEditorTimeoutId = setTimeout(() => {
			document.getElementById("reader").style.removeProperty("margin-left");
			this.rendition?.resize(w, h);
		}, 500);
	}

	componentDidUpdate() {
		this.props.book.ready
			.then(() => {
				if (
					this.state.bookLoadedTimestamp &&
					this.props.book.loadedTimestamp &&
					this.state.bookLoadedTimestamp?.getTime() != this.props.book.loadedTimestamp?.getTime()
				) {
					this.rendition = this.props.book.renderTo("reader");
					this.setState({ bookLoadedTimestamp: this.props.book.loadedTimestamp });
				}
				this.rendition.q.enqueue(this.autoResizeEditor);
			})
			.then(() => {
				let displayPromise;
				if (this.props.book.spine.get(this.props.openFileUrls.contentAnchored))
					displayPromise = this.rendition?.display(this.props.openFileUrls.contentAnchored);
				else displayPromise = this.rendition?.display();
			});
	}

	render() {
		return (
			<div style={this.props.visible ? {} : { display: "none" }} id="reader" className="reader">
				<div className="controls">
					<a href="#" onClick={() => this.rendition?.prev()}>
						&lt;
					</a>
					<a href="#" onClick={() => this.rendition?.next()}>
						&gt;
					</a>
				</div>
			</div>
		);
	}
}

export default BookPreview;
