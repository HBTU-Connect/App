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
import DiscoverClubs from './discoverClubs';

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
        const body = document.getElementsByClassName('body-container')[0]
        body.addEventListener('scroll', onScroll)
        console.log(window.location)
    }, [])

    useEffect(() => {
        if(displayPortal && portalRef.current){
            portalRef.current.style.top = '0'
            portalRef.current.style.left = '0'
        }
        else if(!displayPortal && portalRef.current){
            portalRef.current.removeAttribute('style')
        }
    }, [displayPortal])

    const onScroll = () => {
        const el = document.getElementsByClassName('content-container__right')[0]
        const parent = document.getElementsByClassName('body-container')[0]
        const sibling = document.getElementsByClassName('content-container__left')[0]
        const rect = el.getBoundingClientRect()
        // const parentHeight = parent.offsetHeight -50
        // let height 
        if(parent.scrollTop > (rect.height -  parent.offsetHeight ) && parent.scrollTop < (sibling.offsetHeight - parent.offsetHeight +60 )){
            if(rect.height -  parent.offsetHeight <= 0)
                el.style.transform = `translateY(${parent.scrollTop}px)`
            else{
                el.style.transform = `translateY(${parent.scrollTop - (rect.height -  parent.offsetHeight)}px)`
            }
        }
        if(parent.scrollTop === 0){
            el.style.transform = `translateY(${0}px)`
        }
    }

    return(
        <>
        {displayPortal && <RequestClub setDisplayPortal={setDisplayPortal} portalRef={portalRef} />}
        <div className='content-container'>
            <div className='content-container__left'>
                <span className='content-container__left-helper-text'>Your Clubs</span>
                {myclubs.map((club, index) => (
                    <ClubCard key={index} name={club.title} profile={club.img} desc={club.description} />
                ))}
                <DiscoverClubs />
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