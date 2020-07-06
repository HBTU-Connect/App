import React from 'react'
import profileImage from '../../../images/profile.jpg';

const AskCard = (props) => {
    return(
        <div className='card card-ask card-ask-question' onClick={props.handleAskClick}>
            <div className='card-header'>
                <img className='card-header__img' src={profileImage} alt='profile' />
                <span className='card-header__username'>Yashveer Talan</span>
            </div>
            <span className='card-text'>Ask Question</span>
        </div>
    )
}

export default AskCard;