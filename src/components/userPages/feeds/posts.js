import React from 'react'; 

//images
import coverImage from '../../../images/cover.jpg';
import profileImage from '../../../images/profile.jpg';

const Post = (props) => {
    return(
        <div className='post-wrapper'>
            <div className='post'>
                <div className='post-profile'>
                    <div className='post-profile--picture'>
                        <img src={profileImage} alt='profile' />
                    </div>
                    <div className='post-profile--user'>
                        <span className='post-profile--user-name'>Yashveer Talan</span>
                        <span className='post-profile--user-username'>@yv-official</span>
                    </div>

                </div>
                <div className='post-content'>
                    <img src={props.post === 'cover' ? coverImage : profileImage} alt='profile' />
                </div>
                <div className='post-details'>
                    <div className='post-details--views'>
                        20 views
                    </div>
                    <div className='post-details--time'>
                        2 hours ago
                    </div>
                </div>
            </div>
            <div className='post-likes'>
                <div className='post-likes--buttons'>
                    <button>Like</button>
                    <button>Dislike</button>
                </div>
                <div className='post-likes--details'>
                    10 Likes | 2 Dislike
                    <div className='post-likes--details-likes-progress' style={{ width: 'calc(100% * (10/12))'}}></div>
                </div>
            </div>
            <div className='post-comments'>
                <span className='post-comments-link'>View all 24 comments</span>
                <div className='post-comments--addcomment'>
                    <div className='post-comments--addcomment-user'>
                        <img src={profileImage} alt='profile' />
                    </div>
                    <div className='post-comments--addcomment-text'>
                        <input type='text' placeholder='Add a comment...' />
                    </div>
                    <button>Post</button>
                </div>
            </div>
        </div>
    );
}

export default Post;