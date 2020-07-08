import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Chat as ChatIcon,
        Home as HomeIcon,
        Notifications as NotificationsIcon,
        SearchRounded as SearchIcon,
        Apps as AppsIcon
} from '@material-ui/icons';
import{ headerDisplay } from '../actions/headerAction'

// import icons from '../images/icons.svg';
import userImage from '../images/profile.jpg'

const StyledBadge = withStyles((theme) => ({
    badge: {
      top: 4,
      right: 4,
      border: `3px solid rgb(66,103,178)`,
      padding: '6px 6px',
      borderRadius: '50%'
    },
  }))(Badge);

  const ContentBadge = withStyles((theme) => ({
    badge: {
      top: 3,
      right: 3,
      border: `3px solid rgb(66,103,178)`,
      padding: '2px 2px',
    },
  }))(Badge);

const Header = (props) =>  {
    // state = { addClassName : ''}
    const [ headerClass, setHeaderClass ] = useState('')


    useEffect(() => {
        console.log(props.UI)
        if(props.UI)
        setHeaderClass(props.UI.displayHeader)
    }, [props.UI])

    // svgRender = (iconName, classname ) => {
    //     const useTag = `<use xlink:href="${icons}#icon-${iconName}" />`;
    //     return <svg className={`${classname}__icon`} dangerouslySetInnerHTML={{__html: useTag }} />;
    // }

    const onAuthRender = () => {
        
        if(true){
            return (
                <>
                <form action='#' className='search'>
                    <input type='text' className='search__input' placeholder='Search' />
                    <button className='search__button'>
                        <SearchIcon fontSize='large' />
                    </button>
                </form>
                <nav className='user-nav'>
                    <Link to='/feeds' className='link'>
                    <div className='user-nav__icon-box'>
                        <StyledBadge color="secondary" variant='dot'>
                            <HomeIcon fontSize={"large"} />
                        </StyledBadge>
                    </div>
                    </Link>
                    
                    <Link to='/messaging' className='link'>
                    <div className='user-nav__icon-box'>
                        <ContentBadge color="secondary" style={{ fontSize: '1rem'}} badgeContent={7} max={99}>
                            <ChatIcon />
                        </ContentBadge>
                    </div>
                    </Link>
                    <Link to='/notification' className='link'>
                    <div className='user-nav__icon-box'>
                        <ContentBadge color="secondary" badgeContent={0} max={99}>
                            <NotificationsIcon />
                        </ContentBadge>
                    </div>
                    </Link>
                
                <div className='user-nav__user'>
                    <img src={userImage} alt='User' className='user-nav__user-photo'/>
                    {/* <Avatar src={userImage} alt='user Name' /> */}
                </div>
                </nav> 

                <div className='user-nav__icon-box app-icon'>
                    <AppsIcon fontSize='large'/>
                </div>
                
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

    return (
        <div className={`header ${headerClass}`}>
        
            <Link to='/' className='link'>
            <div className='header-main--logo'>
                {/* <img src={logo} alt='HBTU_Connect' /> */}
                <div className='header-main--logo-primary'>HBTU </div>
                <div className='header-main--logo-secondary'>Connect</div>
            </div>
            </Link>
            {onAuthRender()}
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        UI: state.UIData
    }
}

export default connect(mapStateToProps,{
    headerDisplay
})(Header);