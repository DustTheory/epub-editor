import React, { Component } from 'react';

import CKEditor from 'ckeditor4-react';

import css from './LiveEditor.css';



class LiveEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {  }

        this.showOpenFile = this.showOpenFile.bind(this);
        this.onBeforeCkLoad = this.onBeforeCkLoad.bind(this);

    }

    componentDidUpdate(){
        this.showOpenFile();
        this.editorInstance?.document?.getById(this.props.anchor)?.scrollIntoView(true);       
    }
    
    onBeforeCkLoad(CKEDITOR){
        CKEDITOR.on('instanceReady', (function(e){
            this.editorInstance = e.editor;
            // needed to reset editor after switching views
            this.setState({filename: '', fileContent: ''}, () => {
                this.showOpenFile();
            }); 
        }).bind(this)); 
    }

    showOpenFile(){
        if(this.props.file){
            let filename = this.props.file.name;
            if(filename !== this.state.filename){
                this.props.file.async('text').then((fileContent)=>{
                    fileContent = swapAssetUrlsForBase64(this.props.book, fileContent);
                    this.setState({ fileContent: fileContent, filename: filename });
                });
            }
        }
    }

    render() { 
        return ( 
            <div className="live-editor-container">
                <div id="live-editor" className="live-editor">
                    <CKEditor
                        type={"inline"}
                        data={this.state.fileContent}
                        config={{
                            allowedContent: true
                        }}
                        onBeforeLoad={this.onBeforeCkLoad}
                    />
                </div>
            </div>
         );
    }
}

function swapAssetUrlsForBase64(book, document){
    let newDocument = document
    book.resources.assets.forEach((asset, index) => {
        if(!book.resources.replacementUrls[index]){
            console.log(book.resources.replacementUrls);
            console.log(asset, index);
        }
        newDocument = newDocument.replaceAll(asset.href, book.resources.replacementUrls[index]);
    });
    return newDocument;
}
 
export default LiveEditor;