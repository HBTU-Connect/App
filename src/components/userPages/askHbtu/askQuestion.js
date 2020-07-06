import React, { useState, useRef } from 'react'

import { Divider, TextField, Button, Chip, Avatar } from '@material-ui/core'
import { 
    People as PeopleIcon,
    Person as PersonIcon,
    VisibilityOff as VisibilityOffIcon,
    ExpandMore as ExpandMoreIcon, 
    Check as CheckIcon
} from '@material-ui/icons'

import { TextArea } from '../events/utils/textEditor'
import RenderBody from '../events/utils/htmlSerializer'


  
const AskQuestion = (props) => {
    const [ openSelect, setOpenSelect ] = useState(false)
    const [ selectValue, setSelectValue ] = useState('public')
    const [ formValues, setFormValues ] = useState({})
    const [ bodyValue, setBodyValue ] = useState(textareaInitialValue)
    const [ tagValues, setTagValue ] = useState('')
    const [ tags, setTags ] = useState([])
    const [ review, setReview ] = useState(false)
    const tagsRef = useRef(null)

    const onMenuClick =() => {
        setOpenSelect(!openSelect)
    }

    const handleMenuItemClick = (key) => {
        setSelectValue(key)
        setOpenSelect(false)
    }

    const handleInputChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormValues({...formValues, [name]: value })
        console.log(formValues)
    }

    const handleTagsChange = (e) => {
        setTagValue(e.target.value)
        const tagArray = e.target.value.split(' ')
        setTags(tagArray)
        if(tagsRef.current){
            const el = tagsRef.current
            const scrollWidth = el.scrollWidth
            const parentWidth = document.getElementsByClassName('portal-ask-question__tags')[0].offsetWidth
            if(scrollWidth > parentWidth){
                el.scrollTo(scrollWidth - parentWidth, 0)
            }
        }
    }

    const handleFormSubmit = () => {
        if(!review){
            setReview(true)
        }else{
            const values = {privacy: selectValue, question: { ...formValues, body: bodyValue, tags: tags }, answers: [] }
            window.localStorage.setItem('question', JSON.stringify(values))
        }
    }

    const renderTags = () => {
        return tags.map((tag, index) => {
            if(tag !== ''){
                return(
                    <Chip key={index} variant="outlined" color="primary" size="small" label={tag} style={{ marginRight: '0.5rem', fontSize: '1.2rem' }} />
                )
            }
            // return (<> </>)
        })
    }

    return(
        <div ref={props.portalRef} onClick={() => {props.setDisplayPortal(!props.displayPortal)}} className='portal click-away-listner'>
            <div className='portal-ask-question' onClick={(e) => { e.stopPropagation() }}>
                { !review && 
                <div className='portal-content'>
                <div className='portal-content-header portal-ask-question__header'>
                    <img src={props.userImg} alt='Username' />
                    <span className='portal-ask-question__header-username'> Yashveer Talan </span> asked 
                    <div className='portal-ask-question__header-select' onClick={onMenuClick}>
                         {selectValue === 'public' ? <PeopleIcon style={{ marginRight: '0.5rem'}} /> : (selectValue === 'private' ? <PersonIcon style={{ marginRight: '0.5rem'}} /> : <VisibilityOffIcon style={{ marginRight: '0.5rem'}} /> )} 
                         {selectValue} 
                         <ExpandMoreIcon fontSize='large' style={{ marginLeft: '0.5rem'}} />
                         {openSelect && <div onClick={(e) => e.stopPropagation()} className='portal-ask-question__header-select__menu-items'>
                                <div onClick={() => handleMenuItemClick('public')} ><div><span> Public</span> <span>Others will see your identity alongside this question on your profile and in their feeds.</span></div>{ selectValue === 'public' && <CheckIcon fontSize='large' />}</div>
                                <div onClick={() => handleMenuItemClick('private')}><div><span> Private</span><span>Your identity will be shown but this only connected mates can answer this question</span></div>{ selectValue === 'private' && <CheckIcon fontSize='large' />}</div>
                                <div onClick={() => handleMenuItemClick('anonymous')}><div><span> Anonymous</span><span>Your identity will never be associated with this question.</span></div>{ selectValue === 'anonymous' && <CheckIcon fontSize='large' />}</div>
                            </div>}
                    </div>
                </div>
                <div className='portal-content-container postal-ask-question'>
                    <form onSubmit={handleFormSubmit}>
                        <div className='portal-ask-question__title'>
                            <span className='portal-ask-question__name'>Title</span>
                            <span className='portal-ask-question__helper-text'>Be specific and imagine you’re asking a question to another person</span>
                            <TextField type='text' required name='title' fullWidth margin='dense' placeholder='Add title' value={formValues.title} variant='outlined' onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className='portal-ask-question__body'>
                            <span className='portal-ask-question__name'>Body</span>
                            <span className='portal-ask-question__helper-text'>Include all the information someone would need to answer your question</span>
                            {/* <TextField name='body' fullWidth margin='dense' placeholder='Add title' variant='outlined' multiline rows={10} rowsMax={10} /> */}
                            <div className='text-editor-container'>
                                <TextArea value={bodyValue} setValue={setBodyValue} />
                            </div>

                        </div>
                        <div className='portal-ask-question__tags'>
                            <span className='portal-ask-question__name'>Tags</span>
                            <span className='portal-ask-question__helper-text'>Add up to 5 tags to describe what your question is about</span>
                            <TextField name='tags' fullWidth margin='dense' placeholder='Add title' variant='outlined' value={tagValues} onChange={(e) => handleTagsChange(e)} autoComplete='off' autoCorrect='off' />
                            <div ref={tagsRef} className='portal-ask-question__tag'> {renderTags()} </div>
                        </div>
                    </form>
                </div>
                {/* <Divider style={{ marginTop: 'auto'}} /> */}
                </div>}
                {review && 
                <div className='portal-content portal-ask-review'>
                    <div className='review-tags-container'>
                        {renderTags()}
                    </div>
                    {( selectValue === 'public' || selectValue === 'private') && <div className='portal-ask-question__header'>
                        <img src={props.userImg} alt='Username' />
                        <span className='portal-ask-question__header-username'> Yashveer Talan </span> asked
                    </div>}
                    <div className='review-title'>
                        {formValues.title}
                    </div>
                    <div className='review-body'>
                        <RenderBody bodyValue={JSON.stringify(bodyValue)} />
                    </div>
                </div>}
                <div className='portal-footer portal-ask-question'>
                    <Button onClick={() => handleFormSubmit()} variant='contained' color='primary'>{ review ? 'Ask Question' : 'Review'}</Button>
                    {review && <Button onClick={() => setReview(false)} variant='contained' color='primary'>Change</Button>}
                    <Button variant='text' onClick={() => {props.setDisplayPortal(!props.displayPortal); setReview(false) }} >Cancel</Button>
                </div>
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

export default AskQuestion