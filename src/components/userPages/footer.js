import React from 'react'
import { Copyright as CopyrightIcon,
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon, 
    Twitter as TwitterIcon
} from '@material-ui/icons'

const Footer = (props) => {
    return(
        <div className={`footer-section ${props.class}`}>
            <div className='link-menu'>
                <ul>
                    <li>Help</li>
                    <li>About</li>
                    <li>Policies</li>
                </ul>
            </div>
            <div className='social-links'>
                { /*eslint-disable-next-line*/ }  
                <a href="https://facebook.com" target='_blank' rel="noopener noreferrer"><FacebookIcon fontSize='large' /></a>
                { /*eslint-disable-next-line*/ } 
                <a href="https://twitter.com/" target='_blank' rel="noopener noreferrer" ><TwitterIcon fontSize='large'/> </a>
                { /*eslint-disable-next-line*/ } 
                <a href="https://www.linkedin.com" target='_blank' rel="noopener noreferrer" > <LinkedInIcon fontSize='large' /></a>
                { /*eslint-disable-next-line*/ } 
                <a href="https://instagram.com" target='_blank' rel="noopener noreferrer" ><InstagramIcon fontSize='large' /></a>
            </div>
            <div className='copyright'>
                <span className='copyright-icon'><CopyrightIcon /></span>
                <span className='copyright-title'>HBTU Connect</span>  
            </div>
            <div className='developer'>
                Developed by Yashveer Talan
            </div>
        </div>
    )
}

export default Footer