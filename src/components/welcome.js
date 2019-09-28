import React from 'react';

class Welcome extends React.Component{
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
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <button className='heading-login-button'>Log into your Account <span className='right-arrow'>&rarr;</span></button>
                        </div>
                    </div>
                    <div className='right-floated-div'>
                        <div className='signup-form-container'>
                            <span className='form-heading-primary'>Join Us</span>
                            <span className='form-heading-secondary'>And Connect with your Mates</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Welcome;