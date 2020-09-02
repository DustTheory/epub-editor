import React, { Component } from 'react';
import classNames from 'classnames';

import css from './ProgressIndicatorH.css';

class ProgressIndicatorH extends Component {
    constructor(props) {
        super(props);
        this.state = { progress: 0 }
        this.indicatorRef = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
    }

    componentDidMount(){
        setInterval(this.updateProgress, 1000);
    }

    componentDidUpdate(){
        if(!this.props.scrollElement)
            return;
        if(this.props.scrollElement != this.state.scrollElement){
            if (typeof this.props.scrollElement.addEventListener != "undefined") 
                this.props.scrollElement.addEventListener("scroll", this.handleScroll, false);
            else if (typeof this.props.scrollElement.attachEvent != "undefined") 
                this.props.scrollElement.attachEvent("onscroll", this.handleScroll);
            this.setState({ progress: 0, scrollElement: this.props.scrollElement });
        }
        if(this.props.section != this.state.section){
            this.updateProgress();
        }
    }

    updateProgress(){
        if(!this.props.scrollElement)
            return;
        let progress = Math.round(100*this.props.scrollElement.scrollingElement.scrollTop/this.props.scrollElement.scrollingElement.scrollTopMax) || 0;
        let showPrev = progress == 0, showNext = progress == 100;
        if(this.props.scrollElement.scrollingElement.scrollTopMax == 0){
            progress = 100;
            showNext = showPrev = true;
        }
        if(this.props.section == 0)
            showPrev = false;
        if(this.props.section == this.props.nSections-1)
            showNext = false;
        this.setState({ showPrev: showPrev, showNext: showNext, progress: progress, section: this.props.section });
    }

    handleScroll(e){
		if(this.scrollEventTimeout)
			clearTimeout(this.scrollEventTimeout);
		this.scrollEventTimeout = setTimeout(this.updateProgress, 100);
    }


    render() { 
        return (
            <React.Fragment>
                <div className={classNames({'previous-section': true, visible: this.state.showPrev })}><span onClick={this.props.loadPrevSection}>Previous Section</span></div>
                <div className={classNames({
                    'progress-indicator-h': true,
                    'percent100': this.state.showNext
                })} >
                    <div style={{width: this.state.progress+'%'}} className="indicator" ref={this.indicatorRef}>
                    <div className="content">
                        <span onClick={this.props.loadNextSection}>Next section</span>
                    </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default ProgressIndicatorH;