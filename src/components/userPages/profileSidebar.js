import React from 'react';
import { NavLink } from 'react-router-dom';

//images
import avatarImage from '../../images/profile.jpg';
import coverImage from '../../images/cover.jpg';
import copyrightImage from '../../images/copyright.png';

class Sidebar extends React.Component{
    render(){
        return(
            <div className='sidebar-container'>
                <div className='profile-section'>
                    <div className='profile-section--cover' style={{ backgroundImage: `url(${coverImage})`}}>
                        <div className='profile-section--cover-profile-picture'>
                            <img src={avatarImage} alt='profile' />
                        </div>
                    </div>
                    <div className='profile-section--username'>
                        <span className='profile-section--username-name'>Yashveer Talan</span>
                        <span className='profile-section--username-username'>@yv-official</span>
                    </div>
                    <div className='profile-section--userdetails'>
                        <div className='profile-section--userdetails-posts'>
                            <span className='profile-section--userdetails-posts-number'>10</span>
                            <span className='profile-section--userdetails-posts-title'>Posts</span>
                        </div>
                        <div className='profile-section--userdetails-connections'>
                            <span className='profile-section--userdetails-connections-number'>45</span>
                            <span className='profile-section--userdetails-connections-title'>Connections</span>
                        </div>
                        <div className='profile-section--userdetails-hits'>
                            <span className='profile-section--userdetails-hits-number'>70</span>
                            <span className='profile-section--userdetails-hits-title'>Hits</span>
                        </div>
                    </div>
                </div>
                <div className='divider'></div>
                <div className='menu-section'>
                    <ul>
                        <NavLink to='/feeds' className='link' activeClassName='link selected'><li>Feeds</li></NavLink>
                        <NavLink to='/clubs'  className='link' activeClassName='link selected'><li>Clubs</li></NavLink>
                        <NavLink to='/askhbtu' className='link' activeClassName='link selected'><li>Ask HBTU</li></NavLink>
                        <NavLink to='/aroundyou' className='link' activeClassName='link selected'><li>Around You</li></NavLink>
                    </ul>
                </div>
                <div className='divider'></div>
                <div className='footer-section'>
                    <div className='link-menu'>
                        <ul>
                            <li>Help</li>
                            <li>About</li>
                            <li>Policies</li>
                        </ul>
                    </div>
                    <div className='social-links'>
                        { /*eslint-disable-next-line*/ }  
                        <a href="https://facebook.com" target='_blank' rel="noopener noreferrer" className="fa fa-facebook"></a>
                        { /*eslint-disable-next-line*/ } 
                        <a href="https://twitter.com/" target='_blank' rel="noopener noreferrer" className="fa fa-twitter"></a>
                        { /*eslint-disable-next-line*/ } 
                        <a href="https://www.linkedin.com" target='_blank' rel="noopener noreferrer" className="fa fa-linkedin"></a>
                        { /*eslint-disable-next-line*/ } 
                        <a href="https://instagram.com" target='_blank' rel="noopener noreferrer" className="fa fa-instagram"></a>
                    </div>
                    <div className='copyright'>
                        <span className='copyright-icon'><img src={copyrightImage} alt='copyright' /></span>
                        <span className='copyright-title'>HBTU Connect</span>  
                    </div>
                    <div className='developer'>
                        Developed by Yashveer Talan
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;