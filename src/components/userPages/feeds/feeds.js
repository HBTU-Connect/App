import React from 'react';

import CreatePost from './createPost';
import Post from './posts';
import NotificationBox from './notificationBox';

class Feeds extends React.Component{
    render(){
        return(
            <>
                <div className='content-container'>
                    <CreatePost />
                    <Post />
                    
                </div>
                <div className='right-container'>
                    <NotificationBox />
                </div>
            </>
        );
    }
}

export default Feeds;