import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { store } from 'react-notifications-component';

//components
import validate from '../validate';
import Footer from './footer';
import PageHTML from './pageHTML';

//actions
import { getData } from '../../actions';



class WelcomePage extends React.Component{
    state= {
        loading: false,
        error: false
    }


    componentDidUpdate(){
        if(this.state.loading === true){
            if(this.props.userData.data  || this.props.userData.err){
                this.setState({ loading: false});
            }
        }
        setTimeout(() => {
        if(this.props.userData.err && this.state.error && !this.props.userData.data && !this.state.loading){
            store.addNotification({
                title: this.props.userData.err.title,
                message: this.props.userData.err.msg,
                type: "danger",
                insert: "bottom",
                container: "bottom-left",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                duration: 5000,
                onScreen: true
                }
            });
            this.setState({ error: false});
            this.props.change("dob", null);
        }
        },100);
        
    }

    renderField = ({ input, label, type,input: { value }, meta: { valid, dirty, active, touched, error } }) => (
        <div className='input-field'>
            <label className={value || dirty || active ? 'input-field--label touched' : 'input-field--label'}>
                {label}
            </label>
          <div >
            <input 
                className={ value || dirty || active ? (valid ? 'input-field--value touched' : 'input-field--value error') : 'input-field--value'}
                {...input} 
                type={type}
            />
            {touched && error && <span className='input-field--value-error'>{error}</span>}
          </div>
        </div>
    );

    onFormSubmit = (formValues) => {
        this.setState({ loading: true, error: true })
        window.localStorage.setItem('rollNumber', formValues.rollNumber);
        this.props.getData(formValues);

    }

    render(){
        if(this.props.userData.data){
            return <Redirect to='/signup' />
        }
        
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
                                {/* { this.props.userData.err && fbd} */}
                                { this.state.loading  && <div className='loader'><div className='loader-animation'></div></div> }
                            </div>
                        </div>
                    </div>
                </div>
                <PageHTML />

                <Footer />
            </div>
        );
    }
}

const formWrapper = reduxForm({
    form: 'join', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true,
    validate
})(WelcomePage);

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        initialValues: { rollNumber: window.localStorage.getItem('rollNumber')}
    }
}

const connectProps =  connect(mapStateToProps, {
    getData
})(formWrapper);

export default withRouter(connectProps);