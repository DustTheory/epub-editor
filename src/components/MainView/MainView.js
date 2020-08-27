import React, { Component } from "react";

import css from "./MainView.css";

import WelcomeScreen from "../WelcomeScreen";
import CodeEditor from "../CodeEditor";
import LiveEditor from "../LiveEditor/LiveEditor";
import BookPreview from "../BookPreview";
import noBookLoaded from '../NoBookLoaded';

import views from "../../libs/views";
import NoBookLoaded from "../NoBookLoaded";

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
				/>
				<LiveEditor
					visible={views[this.props.activeViewId].mainView == "liveEditor"}
					book={this.props.book}
					file={this.props.openFile}
					openFileUrls={this.props.openFileUrls}
				/>
				<CodeEditor visible={views[this.props.activeViewId].mainView == "codeEditor"} file={this.props.openFile} />
			</div>
		);
	}
}

export default MainView;
