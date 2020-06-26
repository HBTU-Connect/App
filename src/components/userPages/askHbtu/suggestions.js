import React, { useState } from 'react'
import { InsertEmoticon as InsertEmoticonIcon,
         PostAdd as PostAddIcon,
         ArrowForwardIos as ArrowForwardIosIcon,
         ArrowBackIos as ArrowBackIosIcon
} from '@material-ui/icons'
import { Avatar, Button } from '@material-ui/core'

import backgroundImage from '../../../images/space-background.png'

const spaceCards = [{ avatar: 'P', name: 'Python'},{ avatar: 'C', name: 'C++'},{ avatar: 'S', name: 'Start-Up'},{ avatar: 'D', name: 'Development'},{ avatar: 'W', name: 'Web Development'},{ avatar: 'P', name: 'Python'},{ avatar: 'P', name: 'Python'}]

const renderSpaceCards = () => {
    return spaceCards.map((space, index) => {
        return(
            <div key={index} className='space-card'>
                <div className='space-card__header'>
                    <img src={backgroundImage} alt='cover' />
                </div>
                <div className='space-card__avatar'>
                    <Avatar>{space.avatar}</Avatar>
                </div>
                <div className='space-card__content'>
                    <span className='space-card__title'>{space.name}</span>
                    <span className='space-card__description'> Follow {space.name} to help your mates, When they face any problem in it. </span>
                </div>
                <div className='space-card__action'>
                    <Button variant='outlined' color='primary'> <PostAddIcon style={{ marginRight: '0.5rem', transform: 'translateY(-1px)'}}/> Follow</Button>
                </div>
            </div>
        )
    })
}


const Suggestions = (props) => {
    const [ translate, setTranslate ] = useState(0)
    const [ leftButton, setLeftButton ] = useState('button-hide')
    const [ rightButton, setRightButton ] = useState('')

    const handleRightClick = () => {
        const parent = document.getElementsByClassName('card-content')[0]
        const el = document.getElementsByClassName('space-card-wrapper')[0]
        if(translate + parent.offsetWidth < el.offsetWidth - parent.offsetWidth){
            el.style.transform = `translateX(${-translate - parent.offsetWidth}px)`
            setTranslate(translate + parent.offsetWidth)
            setLeftButton('')
            console.log(translate)
        }
        else{
            el.style.transform = `translateX(${-el.offsetWidth + parent.offsetWidth}px)`
            setTranslate(el.offsetWidth - parent.offsetWidth)
            setRightButton('button-hide')
        }
        

    }

    const handleLeftClick = () => {
        const parent = document.getElementsByClassName('card-content')[0]
        const el = document.getElementsByClassName('space-card-wrapper')[0]
        if(translate - parent.offsetWidth > 0){
            el.style.transform = `translateX(${-translate + parent.offsetWidth}px)`
            setTranslate(translate - parent.offsetWidth)
            setRightButton('')
        }
        else{
            el.style.transform = `translateX(${0}px)`
            setTranslate(0)
            setLeftButton('button-hide')
        }
        
    }

    return(
        <div className='card card-suggestions card-suggestions-tags'>
            <div className='card-header'>
                <InsertEmoticonIcon fontSize='large' />
                <span className='card-header__title'>Discover New Spaces</span>
            </div>
            <div className='card-content'>
                <div className='space-card-wrapper'>
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

export default Suggestions;