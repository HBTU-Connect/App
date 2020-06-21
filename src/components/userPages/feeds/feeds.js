import React from 'react';

import Post from './posts';
import NotificationBox from './notificationBox';

class Feeds extends React.Component{
    render(){
        return(
            <>
                <div className='content-container'>
                    <div className='content-container__left'>
                        <Post post='cover' />
                        <Post post='profile' />
                    </div>
                    <div className='content-container__right'>
                            <NotificationBox />
                    </div>
                </div>
                
            </>
        );
    }
}

export default Feeds;