import React from 'react';
import { Link } from 'react-router-dom';

import icons from '../images/icons.svg';
import userImage from '../images/profile.jpg'


class Header extends React.Component {
    state = { addClassName : 'header hide'}

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    
    // componentWillUnmount(){
    //     window.removeEventListener('scroll', this.handleScroll);
    // }
    
    handleScroll = (event) => {
        let scrollTop = window.pageYOffset;
        if(scrollTop > 665){
            this.setState({
                addClassName: 'header'
            });
        }else{
            this.setState({
                addClassName: 'header hide'
            });
        } 
    }

    svgRender = (iconName, classname ) => {
        const useTag = `<use xlink:href="${icons}#icon-${iconName}" />`;
        return <svg className={`${classname}__icon`} dangerouslySetInnerHTML={{__html: useTag }} />;
    }

    onAuthRender = () => {
        
        if(true){
            return (
                <>
                <form action='#' className='search'>
                    <input type='text' className='search__input' placeholder='Search' />
                    <button className='search__button'>
                        {this.svgRender('search', 'search')}
                    </button>
                </form>
                <nav className='user-nav'>
                    <Link to='/feeds'>
                    <div className='user-nav__icon-box'>
                        {this.svgRender('home', 'user-nav')}
                        <span className='user-nav__notification'>3</span>
                    </div>
                    </Link>
                    <Link to='/feeds'>
                    <div className='user-nav__icon-box'>
                        {this.svgRender('bookmark', 'user-nav')}
                        <span className='user-nav__notification'>7</span>
                    </div>
                    </Link>
                    <Link to='/feeds'>
                    <div className='user-nav__icon-box'>
                        {this.svgRender('chat', 'user-nav')}
                        <span className='user-nav__notification'>11</span>
                    </div>
                    </Link>
                    <div className='user-nav__user'>
                        <img src={userImage} alt='User' className='user-nav__user-photo'/>
                        <span className='user-nav__user-name'>Yashveer</span>
                    </div>
                </nav>
                </>
            );
        }
        else{
            return (
                <div className="right-floated-section">
                    <div className='nav-button'>
                        <Link to='/login' className='link'>
                        <button className='login-button'>Log In</button>
                        </Link>
                    </div>
                </div> 
            );
        }
    }

    render(){
        return (
            <div className={ window.location.pathname !== '/login' ?( window.location.pathname === '/' ? `${this.state.addClassName}` : 'header') : 'header hide' } ref='target'>
            
                <Link to='/' className='link'>
                <div className='header-main--logo'>
                    {/* <img src={logo} alt='HBTU_Connect' /> */}
                    <div className='header-main--logo-primary'>HBTU </div>
                    <div className='header-main--logo-secondary'>Connect</div>
                </div>
                </Link>
                {this.onAuthRender()}
            </div>
        );
    }
}

export default Header;