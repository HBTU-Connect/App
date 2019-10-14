import React from 'react'
import { Link } from 'react-router-dom';

//images
import profileImage from '../../../images/profile.jpg';

const NotificationBox = (props) => {
    return(
        <div className='box'>
            <div className='box-title'>
                Notifications
            </div>
            <div className='divider'></div>
            <div className='box-content'>
                <ul>
                    <li>
                        <span className='wrapper'>
                        <div className='profile-photo'>
                            <img src={profileImage} alt='profile' />
                        </div>
                        <div className='details'>
                            <span className='details-text'> Rigved wants to connect with you</span>
                            <button>Connect</button>
                        </div>
                        </span>
                    </li>
                    <li>
                        <span className='wrapper'>
                        <div className='profile-photo'>
                            <img src={profileImage} alt='profile' />
                        </div>
                        <div className='details'>
                            <span className='details-text'> Vasu wants to connect with you</span>
                            <button>Connect</button>
                        </div>
                        </span>
                    </li>
                </ul>
            </div>
            <div className='box-page-link'>
                <Link to='/notifications' className='link'>More</Link>
            </div>
        </div>
    )
}

export default NotificationBox;