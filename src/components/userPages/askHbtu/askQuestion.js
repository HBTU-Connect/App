import React, { useState, useRef } from 'react'
import escapeHtml from 'escape-html'
import { Node, Text } from 'slate'
import { Divider, TextField, Button, Chip, Avatar } from '@material-ui/core'
import { 
    People as PeopleIcon,
    Person as PersonIcon,
    VisibilityOff as VisibilityOffIcon,
    ExpandMore as ExpandMoreIcon, 
    Check as CheckIcon
} from '@material-ui/icons'

import { TextArea } from '../events/utils/textEditor'
import escapeHTML from 'escape-html'

const serialize = node => {
    if (Text.isText(node)) {
        if(node.bold){
            console.log(node.text)
            return `<strong>${escapeHtml(node.text)}</strong>`
        }
        if (node.code) {
            return `<code>${escapeHtml(node.text)}</code>`
        }

        if (node.italic) {
            return `<em>${escapeHtml(node.text)}</em>`
        }
      return escapeHtml(node.text)
    }
    let newurl
    
    const children = node.children.map(n => serialize(n)).join('')
    if (node.type === 'video'){
        const url = node.url
        let tempUrl = url.split('watch?v=')
        if(url.includes('youtube')){
            newurl = `${tempUrl[0]}embed/${tempUrl[1]}`
        }
    }
    if(node.type === 'image'){
        const url = node.url
        const temp = url.split('/')
        const name = temp[temp.length -1]
        newurl = `https://source.unsplash.com/${name}`
    }

    
  
    switch (node.type) {
        case 'block-quote':
            return `<blockquote><p>${children}</p></blockquote>`
        case 'paragraph':
            return `<p>${children}</p>`
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        case 'code_block':
            return `<div class='code_block'>${children}</div>`
        case 'code-line':
            return `<pre>${children}</pre>`
        case 'heading-one':
            return `<h2>${children}</h2>`
        case 'heading-two':
            return `<h3>${children}</h3>`
        case 'bulleted-list':
            return `<ul>${children}</ul>`
        case 'numbered-list':
            return `<ol>${children}</ol>`
        case 'list-item':
            return `<li>${children}</li>`
        case 'image':
            return `<div class='image-container'><img alt=${escapeHtml(node.url)} src=${escapeHtml(newurl)} />${children}</div>`
        case 'video':
            return `<div class='video-container'><iframe title='Youtube Video' src=${escapeHtml(newurl)} />${children}</div>`
        default:
            return children
    }
  }

const renderReviewBody = (bodyValue) => {
    // let htmlContent = ''
    return bodyValue.map((node, index) => {
        //   htmlContent = htmlContent + serialize(node)
          return(
                <div key={index} className='element-wrapper' dangerouslySetInnerHTML={{__html: serialize(node) }} />
            )
        //   console.log(serialize(node))
    })
    // console.log(htmlContent)
    // return(
    //     <div dangerouslySetInnerHTML={{__html: htmlContent }} />
    // )
  }
  
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
            const values = {...formValues, body: bodyValue, privacy: selectValue, tags: tags }
            console.log(values)
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
                        {renderReviewBody(bodyValue)}
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