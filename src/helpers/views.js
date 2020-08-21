import {
    faFeatherAlt,
    faFileCode,
    faPuzzlePiece,
    faBoxes,
    faTags,
    faFileExport
} from '@fortawesome/free-solid-svg-icons';

const views = {
    'liveEdit': {
        id: 'liveEdit', name: "Live Edit", icon: faFeatherAlt
    },
    'codeEdit': {
        id: 'codeEdit', name: "Code Edit", icon: faFileCode
    },
    'tags': {
        id: 'tags', name: "Tags", icon: faTags
    },
    'plugins': {
        id: 'plugins', name: "Plugins", icon: faPuzzlePiece 
    },
    'media': {
        id: 'media', name: "Media", icon: faBoxes
    },
    'export': {
        id: 'export', name: "Export", icon: faFileExport
    }
}


export default views;