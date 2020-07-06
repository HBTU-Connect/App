import React, { useState, useEffect } from 'react'
import TextEditor from '../events/utils/textEditor'
import { Button, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import RenderSelect from '../events/utils/renderMultiSelect'

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('rgb(76,169,125)'),
      backgroundColor: 'rgb(76,169,125)',
      '&:hover': {
        backgroundColor: 'rgb(76,169,100)',
      },
    },
  }))(Button);

const WriteBlog = () => {
    const [ next, setNext ] = useState(false)
    const [ titleValue, setTitleValue ] = useState('')
    const [ subTitleValue, setSubTitleValue ] = useState('')
    const [ tagValue, setTagValue ] = useState(undefined)
    const [ bodyValue, setBodyValue ] = useState(initialBodyValue)


    const defaultOptions = ['One', 'Two', 'Three']

    const handleNextClick = () => {
        if(bodyValue[0] && bodyValue[0].type === 'title' && bodyValue[0].children[0] && bodyValue[0].children[0].text){
            setTitleValue(bodyValue[0].children[0].text)
        }
        setNext(true)
    }
    
    const handlePublishClick = () => {
        let formValues = {title: titleValue, subTitle: subTitleValue, body: bodyValue, tags: tagValue}
        window.localStorage.setItem('blog', JSON.stringify(formValues))
        console.log(formValues)
    }

    return(
        <div className='body-container blog-write'>
            <div className='content-container__blog'>
                {!next && 
                    <TextEditor value={bodyValue} setValue={setBodyValue} />
                }
                {next && <div className='form-container__blog'>
                    <span className='form-container__blog-title'>Add few more details</span>
                    <span className='form-container__blog-helpertext'>Add a preview title...</span>
                    <TextField margin='dense' name='title' variant='outlined' placeholder='Write here...' value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                    <span className='form-container__blog-helpertext'>Add a preview subtitle...</span>
                    <TextField margin='dense' name='subtitle' variant='outlined' placeholder='Write here...' value={subTitleValue} onChange={(e) => setSubTitleValue(e.target.value)} />
                    <span className='form-container__blog-helpertext'>Add tags (up to 5) so readers know what your story is about</span>
                    <RenderSelect defaultOptions={defaultOptions} value={tagValue} setValue={setTagValue} />
                </div>}
                <div className='blog-footer'>
                    <div className='blog-action-container'>
                        {!next && <>
                        <ColorButton variant='contained' onClick={handleNextClick} >Next</ColorButton>
                        <Button variant='text'>Draft</Button>
                        </>}
                        {next && <>
                        <ColorButton variant='contained' onClick={handlePublishClick} >Publish</ColorButton>
                        <Button variant='outlined' onClick={() => setNext(!next)} >Back</Button>
                        <Button variant='text'>Draft</Button>
                        </>}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const initialBodyValue = [
    {
        type: 'title',
        children: [{ text: '' }],
    },
    {
      type: 'paragraph',
      placeholder: 'Tell your story...',
      children: [
        { text: ''}
      ],  
    }
]



export default WriteBlog