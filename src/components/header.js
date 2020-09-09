import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, Redirect } from 'react-router-dom';
import { Badge, Button, ClickAwayListener } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    Chat as ChatIcon,
    Home as HomeIcon,
    Notifications as NotificationsIcon,
    SearchRounded as SearchIcon,
    Apps as AppsIcon
} from '@material-ui/icons';

// redux-utils
import { logoutUser, getUIInfo } from '../store/userSlice'
import { getUI } from '../store/UISlice';

// import icons from '../images/icons.svg';
import userImage from '../images/profile.jpg'
import { useSnackbar } from 'notistack';

const StyledBadge = withStyles((theme) => ({
    badge: {
        top: 4,
        right: 4,
        border: `3px solid rgb(0, 88, 136)`,
        padding: '6px 6px',
        borderRadius: '50%'
    },
}))(Badge);

const ContentBadge = withStyles((theme) => ({
    badge: {
        top: 3,
        right: 3,
        border: `3px solid rgb(0, 88, 136)`,
        padding: '2px 2px',
    },
}))(Badge);

const ColorButton = withStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: 'rgb(230,246,254)',
            color: `rgb(0, 88, 136)`
        },
    },
}))(Button);

const Header = (props) => {
    const [headerClass, setHeaderClass] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const userLoading = useSelector(getUIInfo)
    const UI = useSelector(getUI)

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(UI.header)
        setHeaderClass(UI.header)
    }, [UI.header])

    const handleLogOut = () => {
        setShowMenu(false)
        setLoading(true)
    
        // add action here
        setTimeout(() => {
            setLoading(false)
            setRedirect(true)
            enqueueSnackbar("Successfully logged out", { variant: 'success', autoHideDuration: 3000 })
            dispatch(logoutUser());
            console.log('logged out')
        }, 100)
        
        // browserHistory.push('/')
    }

    const onAuthRender = () => {

        // if(props.authData && props.authData && props.authData.isLoggedIn ){


        if (true) {
            return (
                <>
                    <nav className='user-nav'>
                        <NavLink to='/feeds' className='link' activeClassName='active_tab'>
                            <div className='user-nav__icon-box'>
                                <StyledBadge color="secondary" variant='dot'>
                                    <HomeIcon fontSize={"large"} />
                                </StyledBadge>
                            </div>
                        </NavLink>

                        <NavLink to='/messaging' className='link' activeClassName='active_tab'>
                            <div className='user-nav__icon-box'>
                                <ContentBadge color="secondary" style={{ fontSize: '1rem' }} badgeContent={7} max={99}>
                                    <ChatIcon />
                                </ContentBadge>
                            </div>
                        </NavLink>
                        <NavLink to='/notification' className='link' activeClassName='active_tab'>
                            <div className='user-nav__icon-box'>
                                <ContentBadge color="secondary" badgeContent={0} max={99}>
                                    <NotificationsIcon />
                                </ContentBadge>
                            </div>
                        </NavLink>

                        <div className='user-nav__user' onClick={() => setShowMenu(!showMenu)}>
                            <img src={userImage} alt='User' className='user-nav__user-photo' />
                            {showMenu &&
                                <ClickAwayListener onClickAway={() => setShowMenu(false)}>
                                    <div className='user-nav__user__menu' onClick={(e) => e.stopPropagation()}>
                                        <div className='nav-menu__profile'>
                                            <div className='nav-menu__profile__details'>
                                                <img src={userImage} alt='Yashveer' />
                                                <div className='div-child-1'>
                                                    <span className='span-child-1'>Yashveer Talan</span>
                                                    <span className='span-child-2'>@yv_official</span>
                                                </div>
                                            </div>
                                            <div className='nav-menu__profile__button'>
                                                <Link to='/user/yv_official' className='link'>
                                                    <ColorButton onClick={() => setShowMenu(false)} variant='text'>View profile</ColorButton>
                                                </Link>
                                            </div>
                                        </div>
                                        <ul>
                                            <li onClick={() => setShowMenu(false)} className='nav-menu__heading'>
                                                Account
                            </li>
                                            <li onClick={() => setShowMenu(false)} className='nav-menu__item'>
                                                Settings & Privacy
                            </li>
                                            <li onClick={() => setShowMenu(false)} className='nav-menu__item'>
                                                Help & Support
                            </li>
                                            <li onClick={() => setShowMenu(false)} className='nav-menu__heading'>
                                                Actions
                            </li>
                                            <li onClick={() => setShowMenu(false)} className='nav-menu__item'>
                                                Give Feedback
                            </li>
                                            <li onClick={handleLogOut} className='nav-menu__item log-out'>
                                                Log Out
                            </li>
                                        </ul>
                                    </div>
                                </ClickAwayListener>}
                        </div>
                    </nav>

                    <div className='user-nav__icon-box app-icon'>
                        <AppsIcon fontSize='large' />
                    </div>

                </>
            );
        }
        else {
            return (
                <>
                    <div className='nav-button'>
                        <NavLink to='/login' className='link'>
                            <Button variant='contained' className='login-button'>Log In</Button>
                        </NavLink>
                    </div>
                </>
            );
        }
    }



    return (
        <>
            {!loading && redirect && <Redirect to='/' />}
            <div className={`header ${headerClass}`}>

                <Link to='/' className='link'>
                    <div className='header-main--logo'>
                        {/* <img src={logo} alt='HBTU_Connect' /> */}
                        <div className='header-main--logo-primary'>HBTU </div>
                        <div className='header-main--logo-secondary'>Connect</div>
                    </div>
                </Link>
                <form action='#' className='search'>
                    <input type='text' className='search__input' placeholder='Search' />
                    <button className='search__button'>
                        <SearchIcon fontSize='large' />
                    </button>
                </form>
                {onAuthRender()}
            </div>
        </>
    );
}

export default Header;