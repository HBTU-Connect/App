import React from 'react';
import { Field, reduxForm } from 'redux-form';

import validate from './validate';

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