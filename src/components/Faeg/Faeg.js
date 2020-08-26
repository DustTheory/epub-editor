import React, { Component } from "react";

import css from "./Faeg.css";

import classNames from "classnames";

import MenuBar from "../MenuBar";
import ActivityBar from "../ActivityBar";
import SideBar from "../SideBar";
import MainView from "../MainView";

import Book from "epubjs/src/book";
import Urls from "../../libs/Urls";
import views, { defaultActiveViewId } from "../../libs/views";

class Faeg extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeViewId: defaultActiveViewId,
			hideSidebar: views[defaultActiveViewId].hideSidebar,
			book: new Book(),
			openFileUrls: new Urls(),
		};

		this.changeView = this.changeView.bind(this);
		this.changeOpenFile = this.changeOpenFile.bind(this);
		this.onBookResourcesLoaded = this.onBookResourcesLoaded.bind(this);
		this.uploadEpubFile = this.uploadEpubFile.bind(this);
		this.loadEpubFile = this.loadEpubFile.bind(this);
		this.userInputFile = this.userInputFile.bind(this);
		this.loadFirstSection = this.loadFirstSection.bind(this);
	}

	onBookResourcesLoaded() {
		let book = this.state.book;
		return new Promise((resolve, reject) => {
			let id = setInterval(() => {
				if (book.resources.replacementUrls.length > 0 || book.resources.assets.length == 0) {
					clearInterval(id);
					resolve();
				}
			}, 100);
		});
	}

	/**
	 * Fetches file from epub archive and sets it to currently open file in state.
	 * @param {string} link
	 */

	async changeOpenFile(link) {
		let urls = new Urls(link, this.state.book);
		let file = await this.state.book.archive.zip.file(urls.absoluteUnanchored.substr(1));
		this.setState({ openFile: file, openFileUrls: urls });
	}

	/**
	 * Changes current view. If the new view is same as old one, don't change view.
	 * Instead, hide sidebar unless ignoreRepeat is set to true
	 * @param {string} viewId - Id of view to change to. Defined in libs/views.js
	 * @param {boolean} ignoreRepeat - Hide sidebar if viewId is equal to current viewId.
	 */

	changeView(viewId, ignoreRepeat) {
		if (viewId == this.state.activeViewId && !ignoreRepeat) this.setState((state) => ({ hideSidebar: !state.hideSidebar }));
		else
			this.setState({
				activeViewId: viewId,
				hideSidebar: !!views[viewId].hideSidebar,
			});
	}

	/**
	 * Opens file explorer dialog that loads the selected file into faeg.
	 */

	async uploadEpubFile() {
		this.userInputFile(this.loadEpubFile);
	}

	/**
	 * Loads epub file into faeg as an epubjs Book object.
	 * Loads first book section into state and displays live editor view.
	 * @param {File} file
	 */

	async loadEpubFile(file) {
		this.state.book?.destroy();
		let newBook = new Book(await toBase64(file), {
			encoding: "base64",
			replacements: "base64",
			openAs: "base64",
		});
		newBook.loadedTimestamp = new Date();
		await newBook.ready;
		this.setState({ book: newBook }, async () => {
			await this.loadFirstSection.bind(this)();
			this.changeView("liveEdit", true);
		});
	}

	/**
	 * Opens file explorer dialog and passes selected file to callback.
	 * @param {function} onFileInput
	 */

	userInputFile(onFileInput) {
		var input = document.createElement("input");
		input.setAttribute("type", "file");
		input.addEventListener("change", (e) => onFileInput(e.target.files[0]));
		input.click();
	}

	/**
	 * Loads first section of the book into state.
	 */

	loadFirstSection() {
		return new Promise((resolve, reject) => {
			this.onBookResourcesLoaded().then(async () => {
				let firstItemUrl = decodeURI(this.state.book.spine.items[0]?.url.substr(1));
				let firstItemFile = await this.state.book.archive.zip.file(firstItemUrl);
				if (firstItemUrl && firstItemFile) this.changeOpenFile(firstItemFile.name, firstItemFile);
				resolve();
			});
		});
	}

	render() {
		return (
			<div
				className={classNames({
					faeg: true,
					nosidebar: this.state.hideSidebar,
				})}>
				<MenuBar uploadEpubFile={this.uploadEpubFile} />
				<ActivityBar changeView={this.changeView} activeViewId={this.state.activeViewId} sidebarHidden={this.state.hideSidebar} />
				<SideBar activeViewId={this.state.activeViewId} changeOpenFile={this.changeOpenFile} book={this.state.book} />
				<MainView
					activeViewId={this.state.activeViewId}
					uploadEpubFile={this.uploadEpubFile}
					book={this.state.book}
					openFile={this.state.openFile}
					openFileUrls={this.state.openFileUrls}
				/>
			</div>
		);
	}
}

export default Faeg;

/**
 * Converts file into a base64 encoded string.
 * @param {File} file
 */

function toBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
