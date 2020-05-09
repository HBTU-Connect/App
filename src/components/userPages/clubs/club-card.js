import React from 'react'
import { Link } from 'react-router-dom'

const ClubCard = (props) => {
    return(
        <>
        <div className={`${props.classname}-card`}>
            <img src={props.profile} alt={props.name} className='club-profile'/>
            <span className='club-name'>
                {props.name}
            </span>
            <div className='club-details'>
                {props.details}
            </div>
            <Link to={`/clubs/${props.name}`} className='link'>
                <button className='btn club-view'>{props.classname === 'my-clubs__container'? 'View' : 'View Profile'}</button>
            </Link>
        </div>
        </>
    )
}

export default ClubCard
