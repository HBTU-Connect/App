import React from 'react';
import { Field, reduxForm } from 'redux-form';


import validate from '../validate';
import {renderField} from './renderField';




const SignUpFormSecondPage = props => {
  const { handleSubmit, previousPage } = props
  return (
      <div className='form-container'>
          <div className='form-heading'>
              Create Account
              <div className='divider'></div>
          </div>
          
            <form onSubmit={handleSubmit}>
            <Field name="userName" type="text" component={renderField} label="User Name" />

            <Field name='password' type='password' component={renderField} label='Password' />
            <Field name='confirmPassword' type='password' component={renderField} label='Confirm Password' />
            
            
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

export default reduxForm({
  form: 'signup', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(SignUpFormSecondPage)