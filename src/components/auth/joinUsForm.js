import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { store } from 'react-notifications-component';
import { Redirect, withRouter } from 'react-router-dom';

//components
import validate from '../utils/validate';

//actions
import { getData } from '../../actions';

class JoinUsForm extends React.Component{

    state= {
        loading: false,
        error: false
    }

    componentDidUpdate(){
        const { userData } = this.props;
        if( userData.error && this.state.error  && !this.state.loading){
            store.addNotification({
                title:  userData.error.title,
                message:  userData.error.msg,
                type: "danger",
                insert: "bottom",
                width: 300,
                container: "bottom-left",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                duration: 4000,
                onScreen: true
                }
            });
            this.setState({ error: false});
            this.props.change("dob", null);
        }
        
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
    
    onFormSubmit = async (formValues) => {
        this.setState({ loading: true, error: true });
        window.localStorage.setItem('rollNumber', formValues.rollNumber);
        const response = await this.props.getData(formValues);
        if(response){
            this.setState({ loading: false});
        };
    }

    render(){
        if(this.props.userData.data && !this.state.loading){
            return <Redirect to='/signup' />
        }

        return(
            <>
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
                            {/* { this.props.userData.error && fbd} */}
                            {/* { this.state.loading  && <div className='loader'><div className='loader-animation'></div></div> } */}
                            {this.state.loading && <div className='loader'> <div className="lds-css ng-scope"><div  className="lds-magnify"><div><div><div></div><div></div></div></div></div></div></div>}
                        </div>
                    </div>
            </>
        )
    }
}

const formWrapper = reduxForm({
    form: 'join', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true,
    validate
})(JoinUsForm);

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