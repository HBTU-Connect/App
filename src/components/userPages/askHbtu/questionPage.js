import React, { useEffect, useState, useRef } from 'react'
import { Divider, Button, Chip, IconButton, ButtonGroup, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {Share as ShareIcon,
        Edit as EditIcon,
        ArrowDropUp as ArrowDropUpIcon,
        ArrowDropDown as ArrowDropDownIcon,
        Grade as GradeIcon,
        AccountCircle as AccountCircleIcon,
        Cancel as CancelIcon,
        Send as SendIcon,
        Add as AddIcon
} from '@material-ui/icons'

import { TextArea } from '../events/utils/textEditor'
import RenderBody from '../events/utils/htmlSerializer'

const sampleRelatedQuestions = ['Is object empty?', 'JS: Checking if an object has no properties or if a map/associative-array is empty', 'Using an empty object as a parameter to a conditional if loop', 'How do I check this boolean hashmap is empty in javascript?', 'Check if object inside an object is empty with javascript', 'How to handle empty object in if statement as false?', 'javascript - how to check if exists child object value of key in object?']

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('rgb(0, 88, 136)'),
      backgroundColor: 'rgb(0, 88, 136)',
      '&:hover': {
        backgroundColor: 'rgb(0, 88, 140)',
      },
    },
  }))(Button);

const QuestionPage = (props) => {
    const [ question, setQuestion ] = useState({})
    const [ reload, setReload ] = useState(false)
    const elRef = useRef(null)

    const scrollTo = () => {
        if(elRef.current){
            const scrollHeight = elRef.current.scrollHeight
            const height = elRef.current.offsetHeight
            console.log(scrollHeight,height)
            elRef.current.scrollTo(0, scrollHeight-height)
        }
    }

    useEffect(() => {
        console.log(props.match.params.id)
        const questionValue = window.localStorage.getItem('question')
        setQuestion(JSON.parse(questionValue))
        setReload(false)
        // eslint-disable-next-line
    }, [reload])

    const handleAnswerSubmit = (bodyValue) => {
        const newValues = question
        if(!newValues.answers)
            newValues.answers = []
        newValues.answers.push({body: bodyValue})
        console.log(newValues)
        window.localStorage.removeItem('question')
        window.localStorage.setItem('question', JSON.stringify(newValues))
        setReload(true)
        
    }

    if(Object.keys(question).length === 0 && !reload){
        return <div className='body-container'>Loading...</div>
    }

    return(
        <div className='body-container' ref={elRef}>
            <div className='question-page__left'>
                <div className='question-page__left-header'>
                    <div className='question-title'>
                        {question.question.title}
                    </div>
                    <div className='question-title-details'>
                        <div><span className='span-child-1'>Asked</span>2 days ago</div>
                        <div><span className='span-child-1'>Active</span>Today at 4:30 PM</div>
                        <div><span className='span-child-1'>Views</span>352</div>
                        <div className='div-child-2'><Button variant='text' color='primary' onClick={scrollTo} ><EditIcon style={{marginRight: '0.5rem', fontSize: '1.6rem'}} />Add Answer</Button> </div>
                    </div>
                </div>
                <Divider />
                <div className='question-page__left-content'>
                    <div className='question-page__left-question-container'>
                        <div className='question-sidebar'>
                            <IconButton size='small' > <ArrowDropUpIcon fontSize='large' style={{ fontSize: '4rem'}}  /> </IconButton>
                            <span>24</span>
                            <IconButton size='small' > <ArrowDropDownIcon fontSize='large' style={{ fontSize: '4rem'}} /> </IconButton>
                            <IconButton > <GradeIcon fontSize='large'  /> </IconButton>
                            <IconButton > <ShareIcon fontSize='large' /> </IconButton>
                        </div>
                        <div className='question-body'>
                            <RenderBody bodyValue={JSON.stringify(question.question.body)} />
                            <div className='question-page__left-tags-container'>
                                {question.question.tags.map((tag, index) => (
                                    <Chip key={index} variant="outlined" color="primary" size="medium" label={tag} style={{ marginRight: '1rem', fontSize: '1.2rem' }} />
                                ))}
                            </div>
                            <div className='question-body-user'>
                                <span className='span-child-1'>Asked Mar 28 at 5:25 PM </span>
                                <span className='span-child-2'> <AccountCircleIcon fontSize='large' style={{ marginRight: '0.5rem', color: 'rgb(136, 136, 136)' }} /> Yashveer Talan</span>
                            </div>
                            <Comments calledBy='question' />
                        </div>
                    </div>
                    <div className='question-page__left-answers-container-header'>
                        <span className='span-child-1'>{question.answers.length} Answers</span>
                        <ButtonGroup color="primary" aria-label="outlined primary button group" style={{ marginLeft: 'auto'}}>
                            <Button>Votes</Button>
                            <Button>Recent</Button>
                            <Button>Oldest</Button>
                        </ButtonGroup>
                    </div>
                    <div className='question-page__left-answers-container'>
                        {question.answers.length === 0 && <span className='question-page__left-answers-container-helpertext'>Be the first to answer this Question</span>}
                        {question.answers.length > 0 && <> 
                            {question.answers.map(( answer, index, answers) => (<RenderAnswer key={index} answer={answer.body} index={index} answers={answers} />))}
                        </>}
                    </div>
                </div>
                <Divider style={{ marginTop: '0.3rem'}} />
                <div className='question-page__left-footer'>
                    <span className='question-page__left-footer-title'>Your Answer</span>
                    <RenderTextArea handleAnswerSubmit={handleAnswerSubmit} />
                </div>
            </div>
            <div className='question-page__right'>
                <ColorButton variant='contained' color='primary' ><AddIcon fontSize='large' style={{ marginRight: '1rem'}} /> Ask Question</ColorButton>
                <RenderSideBox title='Linked' questions={sampleRelatedQuestions} />
                <RenderSideBox title='Related' questions={sampleRelatedQuestions} />
            </div>
        </div>
    )
}

const RenderAnswer = ({answer, index, answers}) => {

    console.log(answer)
        return(
            <>
            <div key={index} className='question-page__left-answers-container-answer' >
                <div className='answers-sidebar'>
                    <IconButton size='small' > <ArrowDropUpIcon fontSize='large' style={{ fontSize: '4rem'}}  /> </IconButton>
                    <span>24</span>
                    <IconButton size='small' > <ArrowDropDownIcon fontSize='large' style={{ fontSize: '4rem'}} /> </IconButton>
                    <IconButton > <GradeIcon fontSize='large'  /> </IconButton>
                    <IconButton > <ShareIcon fontSize='large' /> </IconButton>
                </div>
                <div className='answer-body'>
                    <RenderBody bodyValue={JSON.stringify(answer)} />
                    <div className='answer-body-user'>
                        <span className='span-child-1'>Answered Mar 28 at 5:25 PM </span>
                        <span className='span-child-2'> <AccountCircleIcon fontSize='large' style={{ marginRight: '0.5rem', color: 'rgb(136, 136, 136)' }} /> Yashveer Talan</span>
                    </div>
                    <Comments index={index} calledBy='answer' />
                </div>
                
                
            </div>
            {index !== answers.length -1 && <Divider style={{ marginTop: '2rem', width: '100%'}} />}
            </>
        )
}

const Comments = ({index, calledBy }) => {
    const [ addComment, setAddComment ] = useState(false)
    const [ comments, setComments ] = useState([])
    const [ reload, setReload ] = useState(true)
    const [ commentValue, setCommentValue ] = useState('')
    const [ showAllComments, setShowAllComments ] = useState(false)

    useEffect(() => {
        if(reload){
            const question = JSON.parse(window.localStorage.getItem('question'))
            if(calledBy === 'answer'){
                const answerComments = question.answers[index].comments
                if(answerComments){
                    setComments(answerComments)
                }
            }
            else{
                const questionComments = question.question.comments
                if(questionComments){
                    setComments(questionComments)
                }
            }
            setReload(false)
        }
        // eslint-disable-next-line
    },[reload])

    const handleCommentPost = () => {
        const newValues = JSON.parse(window.localStorage.getItem('question'))
        if(calledBy === 'answer'){
            if(!newValues.answers[index].comments )
            newValues.answers[index].comments = []
            newValues.answers[index].comments.push(commentValue)
            // console.log(newValues)
            window.localStorage.removeItem('question')
            window.localStorage.setItem('question', JSON.stringify(newValues))
            // console.log(JSON.parse(window.localStorage.getItem('question')))
        }
        else{
            if(!newValues.question.comments )
            newValues.question.comments = []
            newValues.question.comments.push(commentValue)
            // console.log(newValues)
            window.localStorage.removeItem('question')
            window.localStorage.setItem('question', JSON.stringify(newValues))
            // console.log(JSON.parse(window.localStorage.getItem('question')))
        }
        setReload(true)
        setCommentValue('')
        setAddComment(false)
    }

    const renderComments = () => {
        const range = comments.length >=2 ? comments.length -2 : 0
        // for(let i = range; i < comments.length ; i++){
        // eslint-disable-next-line
        return comments.map((comment, i) =>{
            if(i >= range){
                return(
                    <>
                    <Divider key={index} style={{ width: '100%', marginTop: '1rem' }} />
                    <div key={index+100} className='question-page-comments__comment' >
                        {comment} - 
                        <span className='span-child-1'>Yashveer Talan</span>
                        <span className='span-child-2'>Mar 1'16 at 5:27 PM</span>
                    </div>
                    </>
                )
            }
            
        })
    }



    return(
        <>
        {/* <div className ='question-page__left-question-comments'>
            
        </div> */}
        <div className='question-page-comments'>
            {comments.length > 2 && !showAllComments  && <Button className='button-add-comment' variant='text' color='primary' onClick={() => {setShowAllComments(true)}} >Show {comments.length -2} more comments</Button> }
            {comments.length > 0 && !showAllComments &&  renderComments()}
            { comments.length > 0 && showAllComments && comments.map((comment, index) => (
                <>
                <Divider style={{ width: '100%', marginTop: '1rem' }} />
                <div key={index} className='question-page-comments__comment' >
                    {comment} - 
                    <span className='span-child-1'>Yashveer Talan</span>
                    <span className='span-child-2'>Mar 1'16 at 5:27 PM</span>
                </div>
                </>
            ))}
            {!addComment && <Button className='button-add-comment' variant='text' color='primary' onClick={() => {setAddComment(true)}} >Add a Comment</Button>}
            {addComment &&  <div className='question-page__add-comment'><TextField autoFocus fullWidth margin='dense' name='comment' placeholder='Add Comment' variant='outlined' multiline rows={1} rowsMax={4} value={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
                <IconButton onClick={() => handleCommentPost()} ><SendIcon fontSize='large' /></IconButton> 
                <IconButton onClick={() => setAddComment(false)} ><CancelIcon fontSize='large' /> </IconButton> 
            </div>}
        </div>
        
        </>
    )
}

const RenderTextArea = ({ handleAnswerSubmit }) => {
    const [ bodyValue, setBodyValue ] = useState(textareaInitialValue)

    return(
        <div className='question-page__left-footer__content'>
            <div className='textbox-container'>
                <TextArea value={bodyValue} setValue={setBodyValue} />
            </div>
            <Button variant='contained' color='primary' style={{ marginBottom: '8rem', fontSize: '1.2rem'}} onClick={() => {handleAnswerSubmit(bodyValue); setBodyValue(textareaInitialValue)}}>Post Your Answer</Button>
        </div>
    )
}

const RenderSideBox = ({ title, questions}) => {
    return(
        <div className='sidebox sidebox-question-page'>
            <div className='sidebox-header'>
                <span>{title} </span>
                <Divider style={{ marginTop: '1rem'}} />
            </div>
            <div className='sidebox-content sidebox-question-page__content'>
                {questions.map((question, index) => (
                    <div key={index} className='sidebox-question-page__question'>
                        <div className='sidebox-question-page__question-votes'>
                            24
                        </div>
                        <span>
                            {question}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const textareaInitialValue = [
    {
      type: 'paragraph',
      children: [
        { text: ''}
      ],  
    }
  ]

export default QuestionPage