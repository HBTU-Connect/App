import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import renderField from './renderField';
import validate from '../validate';



class SignUpFormFirstPage extends React.Component{


    renderError = ({ meta: {value, dirty, active, touched, error } }) =>{
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
      
    
    
    renderYearSelector = ({ input, label, meta: {valid, dirty, active, touched, error } }) =>{
        
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
    
    renderBranchSelector = ({ input, label, meta: {valid, dirty, active, touched, error } }) =>{
        
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
    
    render(){
        const { handleSubmit } = this.props;
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
                        component={this.renderBranchSelector}
                        label="Branch"
                    />
                    <Field
                        name="Year"
                        component={this.renderYearSelector}
                        label='Year'
                    />
                            
                    <Field name="sex" component={this.renderError} />
                    
                    <div className='form-button'>
                    <button type="submit" className="next">
                        Next 
                    </button>
                    </div>
                </form>
            </div>
          
        )
      }
}

  
  const formWrapper =  reduxForm({
    form: 'signup', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
  })(SignUpFormFirstPage);

  const mapStateToProps = () => {
        return { initialValues: { /* default values of input fields */}}
  }

  export default connect(mapStateToProps)(formWrapper);