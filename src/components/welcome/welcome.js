import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { ArrowForwardIos as ArrowForwardIosIcon } from '@material-ui/icons'

//components
import Footer from './footer';
import PageHTML from './pageHTML';
import JoinUsForm from '../auth/joinUsForm';
import {headerDisplay} from '../../actions/headerAction'




class WelcomePage extends React.Component{

    componentDidMount(){
        this.props.headerDisplay('hide')
        setTimeout(() => {
        const msg = new SpeechSynthesisUtterance('Welcome to H B T U Connect');
        window.speechSynthesis.speak(msg)
        }, 1000
        )
    }

    handleScroll = (e) => {
        // console.log(e.target.scrollTop)
        if(e.target.scrollTop > 665 && this.props.UI.displayHeader === 'hide' ){
            console.log(e.target.scrollTop)
            this.props.headerDisplay('show')
        }
        else if(e.target.scrollTop < 665 && this.props.UI.displayHeader === 'show'){
            console.log(e.target.scrollTop)
            this.props.headerDisplay('hide')
        }
    }

    render(){    
        return(
            <div className='welcome-page' onScroll={(e) => this.handleScroll(e)}>
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
}

const mapStateToProps = (state) => {
    return{
        UI: state.UIData
    }
}

export default connect(mapStateToProps,{
    headerDisplay
})(withRouter(WelcomePage));

