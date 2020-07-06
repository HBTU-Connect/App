import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import WriteCard from './writeCard'
import BlogCard from './blogCard'
import BlogSideBox from './blogSideBox'
import Footer from '../footer'

const Blog = () => {

    useEffect(() => {
        const body = document.getElementsByClassName('body-container')[0]
        body.addEventListener('scroll', onScroll)
        console.log(window.location)
    }, [])

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

    return(
        <div className='content-container'>
            <div className='content-container__left blog'>
                <Link to='/blogs/new' className='link'>
                    <WriteCard />
                </Link>
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
            <div className='content-container__right blog'>
                <BlogSideBox title='Top this week' type='topFive' />
                <Footer class='ask-footer' />
            </div>
        </div>
    )
}

export default Blog