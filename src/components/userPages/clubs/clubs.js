import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import ClubCard from './clubCard'
import EventBox from './eventBox'
import RequestClub from './requestClub'
import Footer from '../footer'

import ECellImg from '../../../images/clubs/ECell-profile.jpg'
import QuizImg from '../../../images/clubs/Quiz-profile.jpg';
import DebateImg from '../../../images/clubs/debate.jpg';

const clubs = [{title: 'Qfrad', img: QuizImg}, {title: 'Qfrad', img: QuizImg}, {title: 'Qfrad', img: QuizImg}, {title: 'Qfrad', img: QuizImg}, {title: 'Qfrad', img: QuizImg}]
const myclubs = [
    {
        title: 'ECell',
        img: ECellImg,
        description: 'This is kiwifruit: originally called “yang tao”, “melonette” or Chinese gooseberry. Cultivated in its fuzzy variety from Chinese imports, the fruit proved'
    },
    {
        title: 'Qfrad',
        img: QuizImg,
        description: 'This is kiwifruit: originally called “yang tao”, “melonette” or Chinese gooseberry. Cultivated in its fuzzy variety from Chinese imports, the fruit proved'
    },
    {
        title: 'Debnexus',
        img: DebateImg,
        description: 'This is kiwifruit: originally called “yang tao”, “melonette” or Chinese gooseberry. Cultivated in its fuzzy variety from Chinese imports, the fruit proved'
    },
    {
        title: 'Qfrad',
        img: QuizImg,
        description: 'This is kiwifruit: originally called “yang tao”, “melonette” or Chinese gooseberry. Cultivated in its fuzzy variety from Chinese imports, the fruit proved'
    }]

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('rgb(0, 88, 136)'),
      backgroundColor: 'rgb(0, 88, 136)',
      '&:hover': {
        backgroundColor: 'rgb(0, 88, 140)',
      },
    },
}))(Button);


const Clubs = () => {
    const [ displayPortal, setDisplayPortal ] = useState(false)
    const portalRef = useRef(null)

    useEffect(() => {
        if(displayPortal){
            portalRef.current.style.top = '0'
            portalRef.current.style.left = '0'
        }
        else{
            portalRef.current.removeAttribute('style')
        }
    }, [displayPortal])

    return(
        <>
        <RequestClub setDisplayPortal={setDisplayPortal} portalRef={portalRef} />
        <div className='content-container'>
            <div className='content-container__left'>
                <span className='content-container__left-helper-text'>Your Clubs</span>
                {myclubs.map((club, index) => (
                    <ClubCard key={index} name={club.title} profile={club.img} desc={club.description} />
                ))}
            </div>
            <div className='content-container__right'>
                <ColorButton variant='contained' color='primary' onClick={() => setDisplayPortal(true)}> <AddIcon fontSize='large' style={{ marginRight: '1rem'}} /> Request a new club</ColorButton>
                {/* <EventBox /> */}
                <Footer class='club-footer' />
            </div>
        </div>

        
        </>
    )
}

export default Clubs;