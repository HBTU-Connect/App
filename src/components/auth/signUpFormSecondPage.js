import React from 'react';
import { Field, reduxForm } from 'redux-form';

//components
import validate from '../utils/validate';
import { userField } from '../utils/renderField';




class SignUpFormSecondPage extends React.Component {

    state = {
        typePassword: 'password',
        typeConfirmPassword: 'password'
    }

    showPassword = (e) => {
        e.preventDefault();
        if(this.state.typePassword === 'password' ){
          this.setState({ typePassword :'text'});
        }else{ this.setState({ typePassword :'password'});}
    }

    showConfirmPassword = (e) => {
        e.preventDefault();
        if(this.state.typeConfirmPassword === 'password' ){
          this.setState({ typeConfirmPassword :'text'});
        }else{ this.setState({ typeConfirmPassword :'password'});}
    }

    render(){
        const { handleSubmit, previousPage } = this.props
        return (
            <div className='form-container'>
                <div className='form-heading'>
                    Create Account
                    <div className='divider'></div>
                </div>
                
                    <form onSubmit={handleSubmit}>
                    <Field 
                        name="userName" 
                        type="text" 
                        component={userField} 
                        label="User Name" 
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
                        id='password' 
                        name='confirmPassword' 
                        type={this.state.typeConfirmPassword} 
                        component={userField} 
                        label='Confirm Password' 
                        showPassword={this.showConfirmPassword} 
                    />
                    
                    
                    <div className='form-button'>
                        <button type="button" className="previous" onClick={previousPage}>
                        Previous
                        </button>
                        <button type="submit" className='submit' >
                        Submit
                        </button>
                    </div>
                    </form>
            </div>
    
        )
    }
}

export default reduxForm({
  form: 'signup', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(SignUpFormSecondPage)