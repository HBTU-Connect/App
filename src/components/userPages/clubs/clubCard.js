import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Badge } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      width: '2rem',
      height: '2rem',
      borderRadius: '50%',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);
  

const ClubCard = (props) => {
    return(
        <>
        <div className='card club-card'>
            {/* <img src={props.profile} alt={props.name} className='club-profile'/> */}
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                variant="dot"
            >
                <Avatar alt={props.name} src={props.profile} />
            </StyledBadge>
            <div className='club-card__content'>
                <Link to={`/clubs/${props.name}`} className='link club-card-link'>
                    <span className='club-card__name'>
                        {props.name}
                    </span>
                </Link>
                <p className='club-card__desc'>
                    {props.desc}
                </p>
                
                <div className='club-card__details'>
                    <span className='span-child-1'>24 Members</span>
                    <div className='mid-dot-divider'></div>
                    <span className='span-child-2'>57 Likes</span>
                </div>
            </div>
        </div>
        {/* <div className={`${props.classname}-card`}>
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
        </div> */}
        </>
    )
}

export default ClubCard
