import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import {
    PeopleOutline,
} from '@material-ui/icons'

//image
import userImg from '../../images/profile.jpg'


const ColorPrimaryButton = withStyles((theme) => ({
    root: {
        color: 'rgb(0, 88, 136)',
        borderColor: 'rgb(0, 88, 136)',
        '&:hover': {
        backgroundColor: 'rgb(204, 238, 255)',
        },
    },
}))(Button);

const RenderInvitations = () => {
    const [ invitations, setInvitations ] = useState([])

    useEffect(() => {
        setInvitations(sampleInvitations)
    }, [])

    return invitations.map((invitation, index) => (
        <div className='connections-page__invitation-card' key={index}>
            <img className='flex image round' src={userImg} alt='username' />
            <div className='flex-column' style={{ flex: '1 1 0'}}>
                <div className='flex center margin-bottom-half'>
                    <span className='font-black size-1-8 weight-500'>{invitation.firstName + " " + invitation.lastName}</span>
                    <div className='mid-dot-divider'></div>
                    <span className='font-light size-1-4'>@{invitation.username}</span>
                </div>
                <span className='font-light size-1-4 margin-bottom-half' >{invitation.bio}</span>
                <span className='flex center font-light size-1-2'><PeopleOutline  /> <span className='margin-left-half'>{invitation.mutualConnections} Mutual Connections</span></span>
            </div>
            <div className='flex center'>
                <Button>Dismiss</Button>
                <ColorPrimaryButton variant='outlined' color='primary'>Accept</ColorPrimaryButton>
            </div>
        </div>
    ))
}

const sampleInvitations = [
    {
        firstName: 'Yashveer',
        lastName: 'Talan', 
        username: 'yv_official',
        bio: "Hey I'm using HBTU Connect. Join me now",
        mutualConnections: '24'
    },
    {
        firstName: 'Rigved',
        lastName: 'Sambyal', 
        username: 'rigved',
        bio: "Hey I'm using HBTU Connect. I'm A Web Developer",
        mutualConnections: '78'
    },
    {
        firstName: 'Ashish',
        lastName: 'Singh', 
        username: 'ashish_gv',
        bio: "Hey I'm using HBTU Connect. Join me now",
        mutualConnections: '103'
    },
]

export default RenderInvitations;