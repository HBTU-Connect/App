import React from 'react';
import { Field, reduxForm } from 'redux-form';

import renderField from './renderField';
import validate from '../validate';


const renderError = ({ meta: {value, dirty, active, touched, error } }) =>{
    return(
        <div className='input-field--radio'>
        <label className={  dirty || active ? ( value=== 'male' ? 'input-field--radio--label touched male': 'input-field--radio--label' ) : 'input-field--radio--label'}>
            <Field name="sex" component='input' type="radio" value="male" />{' '}
            Male
            <span className="checkmark"></span>
        </label>
        <label className={ dirty || active ? 'input-field--radio--label touched' : 'input-field--radio--label'}>
            <Field name="sex" component='input' type="radio" value="female" />{' '}
            Female
            <span className="checkmark"></span>
        </label>
        <label className={ dirty || active ? 'input-field--radio--label touched' : 'input-field--radio--label'}>
            <Field name="sex" component='input' type="radio" value="other" />{' '}
            Other
            <span className="checkmark"></span>
        </label>
        {touched && error ? <span>{error}</span> : false}
        </div>
    );
}
  


const renderYearSelector = ({ input, label, meta: {valid, dirty, active, touched, error } }) =>{
    
    const years = ['First', 'Second', 'Third', 'Final'];

    return(
    <div className='input-field'>
        <label className={ dirty || active ? 'input-field--label touched' : 'input-field--label'}>
            {label}
        </label>
      <select
       {...input}
       className={ dirty || active ? (valid ? 'input-field--value touched' : 'input-field--value error') : 'input-field--value'}
        >
        <option value=""> </option>
        {years.map(val => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
    );
}

const renderBranchSelector = ({ input, label, meta: {valid, dirty, active, touched, error } }) =>{
    
    const branch = ['BioChemical Engg.', 'Computer Sc. & Engg.', 'Civil Engg.', 'Chemical Engg.'];

    return(
    <div className='input-field'>
        <label className={ dirty || active ? 'input-field--label touched' : 'input-field--label'}>
            {label}
        </label>
        <select
         {...input}
         className={ dirty || active ? (valid ? 'input-field--value touched' : 'input-field--value error') : 'input-field--value'}
        >
            <option value=""> </option>
            {branch.map(val => (
            <option value={val} key={val}>
                {val}
            </option>
            ))}
        </select>
        {touched && error && <span>{error}</span>}
    </div>
    );
}

const SignUpFormFirstPage = props => {
    const { handleSubmit } = props
    const name = "";
    return (
        <div className='form-container'>
            <div className='form-heading'>
                Confirm Details
                <div className='divider'></div>
            </div>
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    type="text"
                    component={renderField}
                    label="First Name"
                    givenValue ={name}
                    className= { name !== "" ? 'disabled-field' : 'field'} 
                />
                <Field
                    name="lastName"
                    type="text"
                    component={renderField}
                    label="Last Name"
                />
                <Field
                    name="email"
                    type="email"
                    component={renderField}
                    label="Email"
                />
                <Field
                    name="phone"
                    type="text"
                    component={renderField}
                    label="Phone"
                />
                <Field
                    name="branch"
                    component={renderBranchSelector}
                    label="Branch"
                />
                <Field
                    name="Year"
                    component={renderYearSelector}
                    label='Year'
                />
                        
                <Field name="sex" component={renderError} />
                
                <div className='form-button'>
                <button type="submit" className="next">
                    Next 
                </button>
                </div>
            </form>
        </div>
      
    )
  }
  
  export default reduxForm({
    form: 'signup', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
  })(SignUpFormFirstPage)