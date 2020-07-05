import React from 'react'
import { IconButton } from '@material-ui/core'
import { BookmarkBorder as BookmarkBorderIcon,
         MoreHoriz as MoreHorizIcon 
} from '@material-ui/icons'

import ClapIcon from '../../../images/clap-icon.png'

const BlogCard = () => {
    return(
        <div className='card card-blog'>
            <span className='card-blog-title'>
                React Hooks vs Classes
            </span>
            <span className='card-blog-des'>
                What's the difference, which should you use in your app, and why?
            </span>
            <div className='card-blog-footer'>
                <div className='card-blog-details'>
                    <span className='card-blog-user'>Yashveer Talan</span>
                    <div className='card-blog-caption'>
                        <span className='card-blog-time'>Mar 10, 2020</span>
                        <div className='mid-dot-divider'></div>
                        <span className='card-blog-praised' title='9 people praised it' > 9 Claps</span>
                    </div>
                </div>
                <div className='card-blog-actions'>
                    <img src={ClapIcon} alt='claps' /><span className='claps-count'>101</span>
                    <IconButton><BookmarkBorderIcon fontSize='large' /> </IconButton>
                    <IconButton><MoreHorizIcon fontSize='large' /> </IconButton>
                </div>
            </div>
        </div>
    )
}
export default BlogCard