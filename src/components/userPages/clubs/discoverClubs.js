import React, { useState } from 'react'
import { InsertEmoticon as InsertEmoticonIcon,
         ArrowForwardIos as ArrowForwardIosIcon,
         ArrowBackIos as ArrowBackIosIcon
} from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import ECellImg from '../../../images/clubs/ECell-profile.jpg'
import QuizImg from '../../../images/clubs/Quiz-profile.jpg';
import DebateImg from '../../../images/clubs/debate.jpg';


const clubCards = [{ profile: ECellImg, name: 'ECell'},{ profile: QuizImg, name: 'Qfrad'},{ profile: DebateImg, name: 'Debnexus'},{ profile: ECellImg, name: 'HFC'}]

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('rgb(0, 88, 136)'),
      backgroundColor: 'rgb(0, 88, 136)',
      '&:hover': {
        backgroundColor: 'rgb(0, 88, 140)',
      },
    },
}))(Button);

const renderSpaceCards = () => {
    return clubCards.map((club, index) => {
        return(
            <div key={index} className='new-club-card'>
                <div className='new-club-card__header'>
                    <img src={club.profile} alt='cover' />
                </div>
                <div className='new-club-card__content'>
                    <span className='new-club-card__title'>{club.name}</span>
                    <div className='new-club-card__details'>
                        <span className='span-child-1'>232 Members</span>
                        <div className='mid-dot-divider'></div>
                        <span className='span-child-2'>324 Likes</span>
                    </div>
                    <span className='new-club-card__helper'>10 of your Connections are in this club</span>
                </div>
                <div className='new-club-card__action'>
                    <ColorButton variant='contained' color='primary'>View</ColorButton>
                </div>
            </div>
        )
    })
}


const DiscoverClubs = (props) => {
    const [ leftButton, setLeftButton ] = useState('button-hide')
    const [ rightButton, setRightButton ] = useState('')

    const handleScroll = () => {
        const parent = document.getElementsByClassName('discover-card__content')[0]
        if(parent.scrollLeft === 0){
            setLeftButton('button-hide')
            setRightButton('')
        }
        else if(parent.scrollLeft === (parent.scrollWidth - parent.offsetWidth)){
            setLeftButton('')
            setRightButton('button-hide')
        }
        else{
            setLeftButton('')
            setRightButton('')
        }
    }

    const handleRightClick = () => {
        const parent = document.getElementsByClassName('discover-card__content')[0]
        if(parent.scrollLeft + 250 < (parent.scrollWidth - parent.offsetWidth)){
            parent.scrollTo(parent.scrollLeft + 250, 0)
            setLeftButton('')
        }
        else{
            parent.scrollTo(parent.scrollWidth - parent.offsetWidth, 0)
            setRightButton('button-hide')
        }
        

    }

    const handleLeftClick = () => {
        const parent = document.getElementsByClassName('discover-card__content')[0]

        if(parent.scrollLeft - 250 > 0){
            parent.scrollTo(parent.scrollLeft - 250,0)
            setRightButton('')
        }
        else{
            parent.scrollTo(0,0)
            setLeftButton('button-hide')
        }
    }

    return(
        <div className='card discover-card'>
            <div className='discover-card__header'>
                <InsertEmoticonIcon fontSize='large' />
                <span className='discover-card__title'>Discover New Clubs</span>
            </div>
            <div className='discover-card__content' onScroll={handleScroll}>
                <div className='discover-card__wrapper'>
                    {renderSpaceCards()}
                </div>
            </div>
            <div className={`card-button right ${rightButton}`} onClick={handleRightClick}>
                <ArrowForwardIosIcon fontSize='large' />
            </div>
            <div className={`card-button left ${leftButton}`} onClick={handleLeftClick}>
                <ArrowBackIosIcon fontSize='large' />
            </div>
        </div>
    )
}

export default DiscoverClubs;