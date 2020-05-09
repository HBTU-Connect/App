import React from 'react';
import { withRouter, Link } from 'react-router-dom';

//components
import Footer from './footer';
import PageHTML from './pageHTML';
import JoinUsForm from '../auth/joinUsForm';




class WelcomePage extends React.Component{

    componentDidMount(){
        setTimeout(() => {
        const msg = new SpeechSynthesisUtterance('Welcome to H B T U Connect');
        window.speechSynthesis.speak(msg)
        }, 1000
        )
    }

    render(){
        
        return(
            <div className='welcome-page'>
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
                            <Link to='/login'>
                            <button className='heading-login-button'>Log into your Account <span className='right-arrow'>&rarr;</span></button>
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
        );
    }
}


export default withRouter(WelcomePage);