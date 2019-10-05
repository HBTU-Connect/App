import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


//components
import { 
    renderField,
    renderRadioButton, 
    renderBranchSelector, 
    renderYearSelector,
    checkBox } from './renderField';
import validate from '../validate';



class SignUpFormFirstPage extends React.Component{
    
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
                        component={renderBranchSelector}
                        label="Branch"
                    />
                    <Field
                        name="year"
                        component={renderYearSelector}
                        label='Year'
                    />
                            
                    <Field name="sex" component={renderRadioButton} />

                    
                    <Field
                            name="declare"
                            id="declare"
                            component={checkBox}
                            type="checkbox"
                        />

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

  const mapStateToProps = (state) => {
        return { initialValues: state.userData.data}
  }

  export default connect(mapStateToProps)(formWrapper);