import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ActivityBar from '../ActivityBar';
import SideBar from '../SideBar';
import Editor from '../Editor';

import views from '../../helpers/views';

import css from './Faeg.css';
import {EpubFile} from '../../helpers/EpubFile.js';

const epubFile = new EpubFile();

class Faeg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeView: 'liveEdit',
            epubFile: new EpubFile()
        };

        this.onViewChange = this.onViewChange.bind(this);
        this.onEpubFileChange = this.onEpubFileChange.bind(this);
    }

    async onEpubFileChange(e) {
        let file = e.target.files[0];
        let newEpubFile = await epubFile.load(file);
        this.setState({epubFile: newEpubFile});
        console.log(this.state.epubFile);
    }

    onViewChange(viewId) {
        this.setState({activeView: viewId});
    }

    render() {
        return (
            <div className="faeg">
                <ActivityBar
                    onViewChange={this.onViewChange}
                    views={views}
                    activeView={this.state.activeView}/>
                <SideBar
                    epubFile={this.state.epubFile}
                    onEpubFileChange={this.onEpubFileChange}/>
                <Editor/>
            </div>
        );
    }
}

export default Faeg;