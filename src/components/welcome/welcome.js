import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ArrowForwardIos as ArrowForwardIosIcon } from '@material-ui/icons'

//components
import Footer from './footer';
import PageHTML from './pageHTML';
import JoinUsForm from '../auth/joinUsForm';

//action
import { displayHeader, getUI } from '../../store/UI';


const WelcomePage = () => {
    const dispatch = useDispatch()
    const UI = useSelector(getUI)

   useEffect(() => {
        // add header hide action here
        dispatch(displayHeader('hide'));

        setTimeout(() => {
        const msg = new SpeechSynthesisUtterance('Welcome to H B T U Connect');
        window.speechSynthesis.speak(msg)
        }, 1000
        )
    }, [])

    const handleScroll = (e) => {
        // console.log(e.target.scrollTop)
        if(e.target.scrollTop > 665 && UI.header === 'hide' ){
            console.log(e.target.scrollTop)
            // this.props.headerDisplay('show')
            dispatch(displayHeader('show'))
        }
        else if(e.target.scrollTop < 665 && UI.header === 'show'){
            console.log(e.target.scrollTop)
            dispatch(displayHeader('hide'))
        }

        // toggle header hide 
    }
  
        return(
            <div className='welcome-page' onScroll={(e) => handleScroll(e)}>
                <div className='welcome-page__wrapper'>
                    <div className='header-container'>
                        <div className='left-floated-div'>
                            <div className='heading-container'>
                                <span className='heading-tertiary'>Welcome to</span>
                                <span className='heading-primary'>HBTU Connect</span>
                                {/* <span className='heading-secondary'>Connecting Mates</span> */}
                                <p className='heading-about'>
                                    We are Social forum with main vision to connect Mates.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                                    dolore magna aliqua.
                                </p>
                                <Link to='/login' className='link-login-button'>
                                <button className='heading-login-button'>Log into your Account <ArrowForwardIosIcon fontSize='large' style={{ marginLeft: '1rem'}} /> </button>
                                </Link>
                            </div>
                        </div>
                        <div className='right-floated-div'>
                            <JoinUsForm />
                        </div>
                    </div>
                    <PageHTML />

                    <Footer />
                </div>
            </div>
        );
}

// const mapStateToProps = (state) => {
//     return{
//         UI: state.UIData
//     }
// }

export default withRouter(WelcomePage);

