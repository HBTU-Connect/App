import React from 'react';

import Post from './posts';
import NotificationBox from './notificationBox';
import Footer from '../footer'

class Feeds extends React.Component{
    componentDidMount(){
        const body = document.getElementsByClassName('body-container')[0]
        body.addEventListener('scroll', this.onScroll)
    }

    onScroll = () => {
        const el = document.getElementsByClassName('content-container__right')[0]
        const parent = document.getElementsByClassName('body-container')[0]
        const sibling = document.getElementsByClassName('content-container__left')[0]
        const rect = el.getBoundingClientRect()
        // let height 
        if(parent.scrollTop > (rect.height -  parent.offsetHeight) && parent.scrollTop < (sibling.offsetHeight - parent.offsetHeight +60)){
            if(rect.height -  parent.offsetHeight <= 0)
                el.style.transform = `translateY(${parent.scrollTop}px)`
            else{
                el.style.transform = `translateY(${parent.scrollTop - (rect.height -  parent.offsetHeight)}px)`
            }
        }
        if(parent.scrollTop === 0){
            el.style.transform = `translateY(${0}px)`
        }
    }

    render(){
        return(
            <>
                <div onScroll={this.onScroll} className='content-container'>
                    <div className='content-container__left'>
                        <Post post='cover' />
                        <Post post='profile' />
                        <Post post='profile' />
                        <Post post='profile' />
                    </div>
                    <div className='content-container__right'>
                        <NotificationBox />
                        <NotificationBox />
                        {/*<NotificationBox /> */}
                        <Footer />
                    </div>
                </div>
                
            </>
        );
    }
}

export default Feeds;