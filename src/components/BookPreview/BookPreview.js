import React, { Component } from 'react';

import css from './BookPreview.css';

class BookPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    

    componentDidMount(){
        let mainView = document.getElementById("main-view");
        var id;
        window.addEventListener('resize', () => {
            clearTimeout(id);
            id = setTimeout(()=>{
                this.rendition?.resize(mainView.clientWidth*0.8, mainView.clientHeight*0.8);
            }, 500);
        });
     
        this.props.book.ready.then(() => {
            this.rendition = this.props.book.renderTo("reader", {width: mainView.clientWidth*0.8, height: mainView.clientHeight*0.8 });
            let href = this.props.file?.name.split('/').slice(-1)[0];
            this.rendition.display(href);
        });
    }

    componentDidUpdate() {
        let href = this.props.file?.name.split('/').slice(-1)[0];
        try {
        this.rendition?.display(href);
        }catch(e){
            console.error(e);
        }
    }

    componentWillUnmount(){
        this.rendition?.clear();
    }

    render() { 
        console.log(this.props.file);
        console.log(this.props.anchor);
        return ( 
            <div id="reader" className="reader">
               <a href="#" onClick={()=>this.rendition?.prev()}>prev</a>
                <a href="#" onClick={()=>this.rendition?.next()}>next</a> 
            </div>
         );
    }
}
 
export default BookPreview;