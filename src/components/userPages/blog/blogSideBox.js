import React from 'react'
import { Divider } from '@material-ui/core'




const BlogSideBox = (props) => {
    return(
        <div className='sidebox blog-sidebox'>
            <div className='sidebox-header blog-sidebox'>
                <span >{props.title}</span>
                <Divider />
            </div>
            
            <div className='sidebox-content blog-sidebox'>
                { props.type === 'topFive' && <RenderTopFive /> }
            </div>
        </div>
    )
}

const RenderTopFive = () => {
    const top5 = ['A 105 Year-Old Japanese Doctor’s Guide to Living Longer', 'The Man Whose Surveillance Camera Sparked a National Uprising', 'How Bad is America’s Coronavirus Explosion? Much Worse Than You Think.', 'Coronavirus May Be a Blood Vessel Disease, Which Explains Everything', 'A 105 Year-Old Japanese Doctor’s Guide to Living Longer']

    return top5.map((title, index) => {
        return(
            <div className='blog-sidebox__tile'>
                <div className='blog-sidebox__count'>
                    0{index+1}
                </div>
                <div className='blog-sidebox__content'>
                    <span className='blog-sidebox__title'>
                        {title}
                    </span>
                    <span className='blog-sidebox__user'>
                        Yashveer Talan
                    </span>
                    <div className='blog-sidebox__details'>
                        <span className='blog-sidebox__views'>
                            90 Views
                        </span>
                        <div className='mid-dot-divider'></div>
                        <span className='blog-sidebox__claps'>
                            25 Claps
                        </span>
                    </div>
                </div>
            </div>
        )
    })
}

export default BlogSideBox