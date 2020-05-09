import React from 'react'
import { NavLink } from 'react-router-dom'

const ClubPageNav = (props) => {
    return(
        <>
        <ul>
            <NavLink to={`/clubs/${props.clubName}`} className='link' activeClassName='active-link' exact>
                <li>Feeds</li>
            </NavLink>
            <NavLink to={`/clubs/${props.clubName}/events`} className='link' activeClassName='active-link'>
                <li>Events</li>
            </NavLink>
            <NavLink to={`/clubs/${props.clubName}/members`} className='link' activeClassName='active-link'>
                <li>Members</li>
            </NavLink>
            <NavLink to={`/clubs/${props.clubName}/about`} className='link' activeClassName='active-link'>
                <li>About</li>
            </NavLink>
            <li className='button-container'><button className='btn club-join-btn'>Join</button></li>
        </ul>
        </>
    )
}

export default ClubPageNav;