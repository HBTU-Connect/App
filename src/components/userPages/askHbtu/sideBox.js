import React, { useState } from 'react'
import { Chip, Avatar, Divider } from '@material-ui/core'
import { Person as PersonIcon, QuestionAnswerSharp } from '@material-ui/icons'


const renderTags = (tags, activeChip, setActiveChip) => {
    let newActiveChip = [...activeChip]

    const handleClick = (index) => {
        if(activeChip[index]){
            newActiveChip[index] = ''
            setActiveChip(newActiveChip) 
        }
        else{ 
            newActiveChip[index] = 'active-chip'
            setActiveChip(newActiveChip) 
        }
    }

    return tags.map((tag, index) => {
        return(
            <Chip key={index} className={`${activeChip[index]}`}  onClick={() => handleClick(index)} variant='outlined'  size='small' label={tag} avatar={<Avatar>#</Avatar>} />
        )
    })
}

const renderMyQuestions = (questions) => {
    return questions.map((question, index) => {
        let newQuestion
        if(question.question.length > 30){
            newQuestion = question.question.slice(0, 30)
            newQuestion = newQuestion + '...'

        }else{
            newQuestion = question.question
        }

        return(
            <div key={index} className='sidebox-question-container'>
                <span className='sidebox-question-container__question' >{newQuestion}</span>
                <div className='sidebox-question-container__details'>
                    <span className='sidebox-question-container__title'>Upvotes</span>
                    <span className='sidebox-question-container__count'>{question.upvotes}</span>
                </div>
                <div className='sidebox-question-container__details'>
                    <span className='sidebox-question-container__title'>Answers</span>
                    <span className='sidebox-question-container__count'>{question.answers}</span>
                </div>
                <div className='sidebox-question-container__details'>
                    <span className='sidebox-question-container__title'>Views</span>
                    <span className='sidebox-question-container__count'>{question.views}</span>
                </div>
            </div>
        )
    })
}

const SideBox = (props) => {
    const [ activeChip, setActiveChip ] = useState([])

    return(
        <div className='sidebox side-data-container ask-data'>
            <div className='sidebox-header sidebox-header-container'>
                <span >{props.title}</span>
                <Divider />
            </div>
            
            <div className='sidebox-content sidebox-ask-content'>
                {props.tags && renderTags(props.tags, activeChip, setActiveChip)}
                {props.myQuestions && renderMyQuestions(props.myQuestions)}
            </div>
        </div>
    )
}

export default SideBox