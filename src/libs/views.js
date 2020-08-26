import {
	faFeatherAlt,
	faFileCode,
	faPuzzlePiece,
	faBoxes,
	faTags,
	faFileExport,
	faBook,
	faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

const views = {
	welcomeScreen: {
		id: "welcomeScreen",
		name: "Welcome Screen",
		mainView: "welcomeScreen",
		hideSidebar: true,
		hideInNav: true,
	},
	liveEdit: {
		id: "liveEdit",
		name: "Live Edit",
		icon: faFeatherAlt,
		mainView: "liveEditor",
		sidebarElements: ["spine", "toc"],
	},
	codeEdit: {
		id: "codeEdit",
		name: "Code Edit",
		icon: faFileCode,
		mainView: "codeEditor",
		sidebarElements: ["toc", "fileExplorer", "resourceExplorer"],
	},
	bookPreview: {
		id: "bookPreview",
		name: "Book Preview",
		icon: faBookOpen,
		mainView: "bookPreview",
		sidebarElements: ["toc"],
	},
	metadata: {
		id: "metadata",
		name: "Metadata",
		icon: faTags,
		mainView: "metadata",
		sidebarElements: [],
	},
	plugins: {
		id: "plugins",
		name: "Plugins",
		icon: faPuzzlePiece,
		mainView: "plugins",
		sidebarElements: [],
	},
	media: {
		id: "media",
		name: "Media",
		icon: faBoxes,
		mainView: "media",
		sidebarElements: ["resourceExplorer"],
	},
	export: {
		id: "export",
		name: "Export",
		icon: faFileExport,
		mainView: "export",
		sidebarElements: [],
	},
};

export const defaultActiveViewId = "welcomeScreen";
export default views;
