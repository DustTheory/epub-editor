import React, {Component} from 'react';

import MenuBar from '../MenuBar';
import ActivityBar from '../ActivityBar';
import SideBar from '../SideBar';
import MainView from '../MainView';

import FileExplorer from '../FileExplorer';
import ResourceExplorer from '../ResourceExplorer/ResourceExplorer';
import Toc from '../Toc';

import WelcomeScreen from '../WelcomeScreen'
import CodeEditor from '../CodeEditor';
import LiveEditor from '../LiveEditor/LiveEditor';
import BookPreview from '../BookPreview';

import views from '../../libs/views';

import css from './Faeg.css';

import Book from 'epubjs/src/book';

class Faeg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeView: 'welcomeScreen',
            hideSidebar: true,
            book: new Book()
        };
        this.onViewChange = this
            .onViewChange
            .bind(this);
        this.loadEpubFile = this
            .loadEpubFile
            .bind(this);
        this.changeOpenFile = this
            .changeOpenFile
            .bind(this);
        this.onBookResourcesLoaded = this
            .onBookResourcesLoaded
            .bind(this);
    }

    async loadEpubFile(e) {
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.addEventListener('change', async (e) =>  {
            let file = e.target.files[0];
            this
                .state
                .book
                .destroy();
            let newBook = new Book(await toBase64(file), {
                encoding: 'base64',
                replacements: 'base64',
                openAs: 'base64'
            });
            await newBook.ready;
            this.setState({
                book: newBook
            }, () => {
                this
                    .onBookResourcesLoaded()
                    .then(async() => {
                        // Open first item in spine
                        let firstItemUrl = decodeURI(this.state.book.spine.items[0]
                            ?.url.substr(1));
                        let firstItemFile = await this
                            .state
                            .book
                            .archive
                            .zip
                            .file(firstItemUrl);
                        if (firstItemUrl && firstItemFile) 
                            this.changeOpenFile(firstItemFile.name, firstItemFile);
                        }
                    ).then(()=>{
                        this.onViewChange('liveEdit')
                    })
            });
        });
        input.click();
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

    async changeOpenFile(filename, file, anchor) {
        this.setState({openFile: file, lastAnchor: anchor});
    }

    onViewChange(viewId) {
        if(viewId == this.state.activeView)
            this.setState(state => ({ hideSidebar: !state.hideSidebar }));
        else
            this.setState({activeView: viewId, hideSidebar: !!views[viewId].hideSidebar });
    }

    render() {
        return (
            <div className={"faeg"+ (this.state.hideSidebar ? ' nosidebar ' : '')} >
                
                <MenuBar loadEpubFile={this.loadEpubFile}/>
                <ActivityBar
                    onViewChange={this.onViewChange}
                    views={views}
                    activeView={this.state.activeView}
                    hideSidebar={this.state.hideSidebar}
                    />
                {
                    !views[this.state.activeView].hideSidebar && !this.state.hideSidebar && (
                        <SideBar>         
                            {views[this.state.activeView]
                                .sidebarElements
                                .includes('toc') && (<Toc
                                    book={this.state.book}
                                    changeOpenFile={this.changeOpenFile}
                                    toc={this.state.book
                                    ?.navigation
                                        ?.toc || []}/>)
        }
                            {views[this.state.activeView]
                                .sidebarElements
                                .includes('fileExplorer') && (<FileExplorer changeOpenFile={this.changeOpenFile} book={this.state.book}/>)
        }
                            {views[this.state.activeView]
                                .sidebarElements
                                .includes('resourceExplorer') && (<ResourceExplorer
                                    book={this.state.book}
                                    changeOpenFile={this.changeOpenFile}
                                    resources={this.state.book.resources}/>)
        }
                        </SideBar>
                    )
                }
                <MainView>
                    {views[this.state.activeView].mainView == 'welcomeScreen' && (<WelcomeScreen loadEpubFile={this.loadEpubFile}/>)}
                    {views[this.state.activeView].mainView == 'bookPreview' && (<BookPreview file={this.state.openFile} anchor={this.state.anchor} book={this.state.book}/>)
}
                    {views[this.state.activeView].mainView == 'liveEditor' && (<LiveEditor
                        anchor={this.state.lastAnchor}
                        book={this.state.book}
                        file={this.state.openFile}/>)
}
                    {views[this.state.activeView].mainView == 'codeEditor' && (<CodeEditor file={this.state.openFile}/>)
}
                </MainView>
            </div>
        );
    }
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default Faeg;