import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import profileImage from '../../../images/profile.jpg';
import AskCard from './askCard'
import QuestionCard from './questionCard'
import SideBox from './sideBox'
import Footer from '../footer'
import Suggestions from './suggestions'
import AskQuestion from './askQuestion'

const myTags = ['python', 'C++', 'web development', 'programming', 'computer sc.', 'third year', 'developer', 'alorithm', 'dsa', 'startup']
const trendingTags = ['python', 'C++', 'web development', 'developer', 'alorithm', 'dsa', 'startup']
const myQuestions = [{ question: "Why can't Python set the Excel print area on a VM without open RDP connection?", upvotes: '5', answers: '2', views: '21'},
                    { question: "Why can't Python set the Excel print area on a VM without open RDP connection?", upvotes: '5', answers: '2', views: '21'},
                    ]

const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body)
}

const AskHbtu = (props) => {
    const [ displayPortal, setDisplayPortal ] = useState(false)
    const portalRef = useRef(null)

    useEffect(() => {
        const body = document.getElementsByClassName('body-container')[0]
        body.addEventListener('scroll', onScroll)
        console.log(window.location)
    }, [])

    useEffect(() => {
        if(displayPortal){
            portalRef.current.style.top = '0'
            portalRef.current.style.left = '0'
        }
        else{
            portalRef.current.removeAttribute('style')
            // portalRef.current.style.top = '9999'
            // portalRef.current.style.left = '9999'
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

    const handleAskClick = () => {
        setDisplayPortal(!displayPortal)
    }

    return(
        <>
        <Portal>
            <AskQuestion portalRef={portalRef} displayPortal={displayPortal} setDisplayPortal={setDisplayPortal} userImg={profileImage} />
        </Portal>
        <div className='content-container'>
        
            <div className='content-container__left ask-hbtu'>
                <AskCard handleAskClick={handleAskClick} />
                <Suggestions />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
                <QuestionCard />
            </div>
            <div className='content-container__right ask-hbtu'>
                <SideBox title='Your Tags' tags={myTags} />
                <SideBox title='Trending Topics' tags={trendingTags} />
                <SideBox title='Your Questions' myQuestions={myQuestions} />
                <Footer class='ask-footer' />
            </div>
        </div>
        </>
    )
}

export default AskHbtu;