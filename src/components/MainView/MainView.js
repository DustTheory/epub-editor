import React, { Component } from "react";

import css from "./MainView.css";

import WelcomeScreen from "../WelcomeScreen";
import CodeEditor from "../CodeEditor";
import LiveEditor from "../LiveEditor/LiveEditor";
import BookPreview from "../BookPreview";
import NoBookLoaded from "../NoBookLoaded";

import views from "../../libs/views";

/**
 * Main view component of faeg.
 */

class MainView extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div id="main-view" className="main-view">
				<NoBookLoaded visible={ views[this.props.activeViewId].mainView == "noBookLoaded"} uploadEpubFile={this.props.uploadEpubFile} />
				<WelcomeScreen
					visible={views[this.props.activeViewId].mainView == "welcomeScreen"}
					uploadEpubFile={this.props.uploadEpubFile}
				/>
				<BookPreview
					visible={views[this.props.activeViewId].mainView == "bookPreview"}
					book={this.props.book}
					openFileUrls={this.props.openFileUrls}
					changeOpenFile={this.props.changeOpenFile}
				/>
				<LiveEditor
					visible={views[this.props.activeViewId].mainView == "liveEditor"}
					book={this.props.book}
					file={this.props.openFile}
					openFileUrls={this.props.openFileUrls}
					section={this.props.section}
					nSections={this.props.nSections}
					loadPrevSection={this.props.loadPrevSection}
					loadNextSection={this.props.loadNextSection}
				/>
				<CodeEditor visible={views[this.props.activeViewId].mainView == "codeEditor"} openFileUrls={this.props.openFileUrls} file={this.props.openFile} />
			</div>
		);
	}
}

export default MainView;
