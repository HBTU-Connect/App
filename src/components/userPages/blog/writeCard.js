import React from 'react'
import profileImage from '../../../images/profile.jpg';

const WriteCard = (props) => {
    return(
        <div className='card card-blog-write' onClick={props.handleAskClick}>
            <div className='card-header'>
                <img className='card-header__img' src={profileImage} alt='profile' />
                <span className='card-header__username'>Yashveer Talan</span>
            </div>
            <span className='card-text'>Tell your story...</span>
        </div>
    )
}

export default WriteCard;