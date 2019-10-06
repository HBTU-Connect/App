import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

//components
import { userField, checkBox } from '../utils/renderField';
import validate from '../utils/validate';

//images
import loginImage from '../../images/login1.png';

class LoginForm extends React.Component{

    state = {
        typePassword: 'password'
    }

    showPassword = (e) => {
        e.preventDefault();
        if(this.state.typePassword === 'password' ){
          this.setState({ typePassword :'text'});
        }else{ this.setState({ typePassword :'password'});}
    }

    onFormSubmit = (formValues) => {
        console.log(formValues);
    }

    render(){
        return(
            <div className='login-form morning'>
                <div className='image-container'>
                    <div className='image-container-heading'>
                        HBTU Connect
                    </div>
                    <div className='image-container-image'>
                        <img src={loginImage} alt='loginImage' />
                    </div>
                </div>
                <div className='login-form--container'>
                    <div className='form-heading'>
                        Login
                        {/* <div className='divider'></div> */}
                        <span className='form-heading-secondary'>
                            Don't have account? <Link className='link' to='/joinus'>Join Now</Link>
                        </span>
                    </div>
                    <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                        <Field 
                            name='userName' 
                            type="text" 
                            component={userField} 
                            label='User Name' 
                        />
                        <Field 
                            id='password' 
                            name='password' 
                            type={this.state.typePassword} 
                            component={userField} 
                            label='Password' 
                            showPassword={this.showPassword} 
                        />
                        <Field
                            name="rememberMe"
                            id="cbx"
                            component={checkBox}
                            type="checkbox" 
                            label='Remember Me'
                            classname = 'toggle'
                        />
                        
                        <button>Log in</button>
                        <Link className='password-reset-link' to='/resetpassword'>Forgot Password?</Link><br />
                        <Link className='password-reset-link' to='/help'>Help?</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'login', //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
  })(LoginForm);