import React, { useEffect, useState, useRef, useContext } from 'react'
import { IconButton, Divider, Button, TextField } from '@material-ui/core'
import { MoreVert as MoreVertIcon,
         BookmarkBorder as BookmarkBorderIcon,
         Share as ShareIcon,
         Stars as StarsIcon,
         Send as SendIcon
} from '@material-ui/icons'
import RenderBody from '../events/utils/htmlSerializer'

import profileImage from '../../../images/profile.jpg';

const BlogPage = () => {
    const [ blog, setBlog ] = useState(undefined)
    const [ loading, setLoading ] = useState(true)
    const [ classStar, setClassStar ] = useState('')
    const [ pointerPosition, setPointerPosition ] = useState(0)
    const scrollBarPointer = useRef(null)
    const parent = useRef(null)
    const sideBar = useRef(null)
    const body = useRef(null)

    useEffect(() => {
        if(loading){
            const blogData = JSON.parse(window.localStorage.getItem('blog'))
            setBlog(blogData)
            setLoading(false)
        }
    }, [loading])

    const handleStarClick = () => {
        if(classStar === ''){
            setClassStar('gold')
        }
        else{
            setClassStar('')
        }
    }

    const handleParentScroll = () =>{
        // console.log(parent.current.scrollTop)
        if(parent.current.scrollTop > 235  && parent.current.scrollTop < (body.current.offsetHeight - 200)){
            // setPointerDisplay('flex')
            sideBar.current.style.visibility = 'visible'
            const position = ((parent.current.scrollTop - 235)*200)/(body.current.offsetHeight -200)
            setPointerPosition(position)

        }
        else{
            sideBar.current.style.visibility = 'hidden'
            // setPointerPosition(0)
        }
    }


    if(loading){
        return(
            <div className='body-container'>
                <h1>Loading...</h1>
            </div>
        )
    }

    return(
        <div ref={parent} onScroll={handleParentScroll} className='body-container blog-page-container'>
            <div ref={sideBar} className='blog-side-bar'>
                <div className='scrollbar'>
                    <div className='scrollbar__track'></div>
                    <div draggable={true} ref={scrollBarPointer} className='scrollbar__pointer' style={{ top: pointerPosition }}></div>
                </div>
                <div className={`star-icon-container ${classStar}`} onClick={handleStarClick}> <StarsIcon fontSize='large' /> </div>
            </div>
            <div className='blog-page'>
                <div className='blog-page__title'>
                    {blog.title}
                </div>
                <div className='blog-page__user'>
                    <img src={profileImage} alt='Yashveer Talan' />
                    <div className='blog-page__user-details'>
                        <span className='span-child-1'>Yashveer Talan</span>
                        <div className='div-child-1'>
                            <span className='span-child'>Oct 14, 2019</span>
                            <div className='mid-dot-divider'></div>
                            <span className='span-child'>200 views</span>
                        </div>
                    </div>
                    <div className='blog-page__user-action'>
                        <IconButton><ShareIcon fontSize='large' /> </IconButton>
                        <IconButton><BookmarkBorderIcon fontSize='large' /> </IconButton>
                        <IconButton><MoreVertIcon fontSize='large' /> </IconButton>
                    </div>
                </div>
                <div ref={body} className='blog-page__body blog-content'>
                    <RenderBody bodyValue={JSON.stringify(blog.body)} />
                </div>
                <div className='blog-page__tags'>
                    <ul>
                    {blog.tags.map((tag, index) => (
                        <li key={index}>{tag.label} </li>
                    ))}
                    </ul>
                </div>
                <div className='blog-page__footer'>
                    <div className={`star-icon-container ${classStar}`} onClick={handleStarClick}> <StarsIcon fontSize='large' /> </div>
                    <span className='blog-page__star-count'>256 stars</span>
                    <div className='blog-page__user-action'>
                        <IconButton><ShareIcon fontSize='large' /> </IconButton>
                        <IconButton><BookmarkBorderIcon fontSize='large' /> </IconButton>
                        <IconButton><MoreVertIcon fontSize='large' /> </IconButton>
                    </div>
                </div>
                <RenderComments />
                
                
                <Divider style={{ width: '100%', marginTop: '5rem'}} />
                <div className='blog-page__writer'>
                    <img src={profileImage} alt='Yashveer Talan' />
                    <div className='blog-page__writer-details'>
                        <span className='span-child-1'>Written By</span>
                        <span className='span-child-2'>Yashveer Talan</span>
                        <span className='span-child-3'>Web developer. Subscribe to my email list now at http://jauyeung.net/subscribe/ . Follow me on Twitter at https://twitter.com/AuMayeung</span>
                    </div>
                    <Button variant='outlined'>Connect</Button>
                </div>
            </div>
        </div>
    )
}

const RenderComments = () => {
    const [ blogComments, setBlogComments ] = useState(undefined)
    const [ showComments, setShowComments ] = useState(false)
    const [ commentValue, setCommentValue ] = useState('')
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        if(loading){
            const blogData = JSON.parse(window.localStorage.getItem('blog'))
            if(blogData.comments)
                setBlogComments(blogData.comments)
            else{
                setBlogComments([])
            }
            setLoading(false)
        }
    }, [loading])

    const handleCommentSubmit = () => {
        const newValues = JSON.parse(window.localStorage.getItem('blog'))
        if(!newValues.comments )
            newValues.comments = []
        newValues.comments.push(commentValue)
        setCommentValue('')
        // console.log(newValues)
        window.localStorage.removeItem('blog')
        window.localStorage.setItem('blog', JSON.stringify(newValues))
        setLoading(true)
    }

    return(
        <div className='blog-page__comments'>
            <Button variant='outlined' onClick={() => setShowComments(!showComments)}> { blogComments && blogComments.length > 0 ? `${showComments ? 'Hide' : 'Show'} ${blogComments.length > 1 ? `all ${blogComments.length}`: `${blogComments.length}`} comments` : `Add comment` }</Button>
            {blogComments && blogComments.length > 0 && showComments && <div className='blog-page__comments-comments'>
                {blogComments.map((comment, index) => (
                    <div key={index} className='blog-page__comments-comments-comment'>
                        <span>{comment} - 
                        <span className='span-child-1'>Yashveer Talan</span>
                        <span className='span-child-2'>Mar 1'16 at 5:27 PM</span></span>
                        <Divider style={{ width: '100%', marginTop: '1rem'}} />
                    </div>
                ))}
                <div className='blog-page__comments-field'>
                    <TextField multiline variant='outlined' rows={1} rowsMax={4} name='comment' placeholder='Add comment...' margin='dense' value={commentValue} onChange={(e) => {setCommentValue(e.target.value)}} />
                    <IconButton onClick={handleCommentSubmit}><SendIcon fontSize='large'/> </IconButton>
                </div>
            </div>}
            
        </div>
    )
}

export default BlogPage