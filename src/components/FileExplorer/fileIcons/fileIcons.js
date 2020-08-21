import cssIcon from './icons/css.svg';
import genericFileIcon from './icons/file.svg';
import fontIcon from './icons/font.svg';
import imageIcon from './icons/image.svg';
import javascriptIcon from './icons/javascript.svg';
import metadataIcon from './icons/readme.svg';
import svgIcon from './icons/svg.svg';
import videoIcon from './icons/video.svg';
import audioIcon from './icons/audio.svg';
import xmlIcon from './icons/xml.svg';

let extensionIconMap = {
    'css': cssIcon,
    'otf': fontIcon,
    'woff': fontIcon,
    'woff2': fontIcon,
    'eot': fontIcon,
    'ttf': fontIcon,
    'png': imageIcon,
    'jpeg': imageIcon,
    'gif': imageIcon,
    'jpg': imageIcon,
    'svg': svgIcon,
    'js': javascriptIcon,
    'opf': metadataIcon,
    'ncx': metadataIcon,
    'html': xmlIcon,
    'xhtml': xmlIcon,
    'htm': xmlIcon,
    'xml': xmlIcon,
    'mp4': videoIcon,
    'm4a': audioIcon,
    'mp3': audioIcon
}

let defaultIcon = genericFileIcon;

export default function iconForFile(filename) {
    let extension = filename.split('.').slice(-1)[0];
    return extensionIconMap[extension] || defaultIcon; 
}