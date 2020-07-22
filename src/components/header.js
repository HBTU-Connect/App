import React, { useState, useEffect } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { Badge, Button, ClickAwayListener } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Chat as ChatIcon,
        Home as HomeIcon,
        Notifications as NotificationsIcon,
        SearchRounded as SearchIcon,
        Apps as AppsIcon
} from '@material-ui/icons';
import{ headerDisplay } from '../actions/headerAction'
import { logoutAction } from '../actions'

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

const Header = (props) =>  {
    // state = { addClassName : ''}
    const [ headerClass, setHeaderClass ] = useState('')
    const [ showMenu, setShowMenu ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ redirect, setRedirect ] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() =>{
        if(!loading && props.authData && props.authData.type === 'logout' && props.authData.data){
            enqueueSnackbar(props.authData.data.msg, {variant: 'success', autoHideDuration: 3000})
            setRedirect(true)
        }
        if(!loading && props.authData && props.authData.type === 'error' && props.authData.data){
            enqueueSnackbar(props.authData.data, {variant: 'error', autoHideDuration: 3000})

        }
        // eslint-disable-next-line
    }, [loading])


    useEffect(() => {
        if(props.UI)
        setHeaderClass(props.UI.displayHeader)
    }, [props.UI])

    const handleLogOut = async () =>{
        setShowMenu(false)
        setLoading(true)
        if(props.authData && props.authData.data && props.authData.data.access_token){
            const accessToken = props.authData.data.access_token
            const response = await props.logoutAction(accessToken)
            if(response) {
                setLoading(false)
            }
        }
    }

    // svgRender = (iconName, classname ) => {
    //     const useTag = `<use xlink:href="${icons}#icon-${iconName}" />`;
    //     return <svg className={`${classname}__icon`} dangerouslySetInnerHTML={{__html: useTag }} />;
    // }

    const onAuthRender = () => {
        
        // if(props.authData && props.authData && props.authData.isLoggedIn ){
        if(true){
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
                        <ContentBadge color="secondary" style={{ fontSize: '1rem'}} badgeContent={7} max={99}>
                            <ChatIcon />
                        </ContentBadge>
                    </div>
                    </NavLink>
                    <NavLink to='/notification' className='link'activeClassName='active_tab'>
                    <div className='user-nav__icon-box'>
                        <ContentBadge color="secondary" badgeContent={0} max={99}>
                            <NotificationsIcon />
                        </ContentBadge>
                    </div>
                    </NavLink>
                
                <div className='user-nav__user'onClick={() => setShowMenu(!showMenu)}>
                    <img src={userImage} alt='User' className='user-nav__user-photo'/>
                    {showMenu && 
                    <ClickAwayListener onClickAway={() => setShowMenu(false)}>
                    <div className='user-nav__user__menu' onClick={(e) => e.stopPropagation()}>
                        <div className='nav-menu__profile'>
                            <div className ='nav-menu__profile__details'>
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
                    <AppsIcon fontSize='large'/>
                </div>
                
                </>
            );
        }
        else{
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

const mapStateToProps = (state) => {
    return{
        UI: state.UIData,
        authData: state.authData
    }
}

export default connect(mapStateToProps,{
    headerDisplay,
    logoutAction
})(Header);