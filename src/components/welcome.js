import React from 'react';
import { Field, reduxForm } from 'redux-form';

//components
import validate from './validate';

//images
import studentsImage from '../images/students.png';
import joinImage from '../images/dive.png';
import postImage from '../images/post.png';
import chatImage from '../images/chatting.png';
import askImage from '../images/ask.png';
import clubImage from '../images/club.png'

class Welcome extends React.Component{

    renderField = ({ input, label, type, meta: { valid, dirty, active, touched, error } }) => (
        <div className='input-field'>
            <label className={ dirty || active ? 'input-field--label touched' : 'input-field--label'}>
                {label}
            </label>
          <div >
            <input 
                className={ dirty || active ? (valid ? 'input-field--value touched' : 'input-field--value error') : 'input-field--value'}
                {...input} 
                type={type}
            />
            {touched && error && <span className='input-field--value-error'>{error}</span>}
          </div>
        </div>
    );

    onFormSubmit = (formValues) => {
        console.log(formValues);
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
                            <button className='heading-login-button'>Log into your Account <span className='right-arrow'>&rarr;</span></button>
                        </div>
                    </div>
                    <div className='right-floated-div'>
                        <div className='signup-form-container'>
                        
                            <div className='form-container'>
                                <div className='form-heading'>
                                    <span className='form-heading-primary'>Join Us</span>
                                    <span className='form-heading-secondary'>And Connect with your Mates</span>
                                </div>
                                <form className='join-us' onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                                    <Field name='rollNumber' type='text' component={this.renderField} label='Roll Number' />
                                    <Field name='dob' type='date' component={this.renderField} label='DOB' />
                                    <button> Join </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section_two'>
                    <div className='section_two-content'>
                        <img src={studentsImage} alt='students'/>
                        <div className='section_two-heading'>
                            <div className='section_two-heading-primary'>
                                Connecting Mates
                            </div>
                            <div className='divider'></div>
                            <div className='section_two-heading-secondary'>
                                Join the community and Grow your connections in the College.
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='section_three'>
                    <div className='cards'>
                        <div className= 'card-1-of-3'>
                            <div class='card-image'>
                                <img src={postImage} alt='post Icon' />
                            </div>
                            <div className='card-heading'>
                                Add Posts
                            </div>
                            <div className='card-content'>
                                Lorem ipsum is placeholder text commonly used in the graphic, print, and 
                                publishing industries for previewing layouts and visual mockups.
                            </div>
                        </div>
                        <div className='card-1-of-3'>
                            <div class='card-image'>
                                <img src={chatImage} alt='chat Icon' />
                            </div>
                            <div className='card-heading'>
                             Chat
                            </div>
                            <div className='card-content'>
                                Lorem ipsum is placeholder text commonly used in the graphic, print, and 
                                publishing industries for previewing layouts and visual mockups.  
                            </div>
                        </div>
                        <div className='card-1-of-3'>
                            <div class='card-image'>
                                <img src={askImage} alt='Ask Icon' />
                            </div>
                            <div className='card-heading'>
                                Ask
                            </div>
                            <div className='card-content'>
                                Lorem ipsum is placeholder text commonly used in the graphic, print, and 
                                publishing industries for previewing layouts and visual mockups.
                            </div>
                        </div>
                    </div>
                </div>

                <div className='section_four'>
                    <div className='section_four-content'>
                        <img src={clubImage} alt='club icon' />
                        <div className='section_four-heading'>
                            <div className='section_four-heading-primary'>
                                Clubs
                            </div>
                            <div className='divider'></div>
                            <div className='section_four-heading-secondary'>
                                You can find all our College Clubs here. 
                                And become A member .
                            </div>
                        </div>
                    </div>
                </div>

                <div className='section_five'>
                    <div className='section_five-content'>
                        <img src={joinImage} alt='join' />
                        <div className='section_five-heading'>
                            Dive into the World of HBTU Connect.
                            <button> Join Now </button>
                        </div>
                    </div> 

                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'join', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true,
    validate
})(Welcome);