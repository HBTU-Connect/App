import React from 'react';
import { Field } from 'redux-form';

export const renderField = ({ input, label, type, input: { value }, meta: {pristine, valid, dirty, active, touched, error } }) => (
    <div className='input-field'>
        
      <div >
        <input 
            className={ value || dirty || active ? (valid ? 'input-field--value touched' : 'input-field--value error') : 'input-field--value'}
            {...input} 
            type={type}
            // value={givenValue === ""? undefined : givenValue}
            disabled={value && pristine ? true : false }
            
        />
        {touched && error && <span className='input-field--value-error'>{error}</span>}
      </div>
      <label className={ value || dirty || active ? 'input-field--label touched' : 'input-field--label'}>
            {label}
        </label>
    </div>
);

export const renderRadioButton = ({ meta: {value, dirty, active, touched, error } }) =>{
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
      {touched && error ? <span className='input-field--value-error'>{error}</span> : false}
      </div>
  );
}



export const renderYearSelector = ({ input, label, meta: {valid, dirty, active, touched, error } }) =>{
  
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
    {touched && error && <span className='input-field--value-error'>{error}</span>}
  </div>
  );
}

export const renderBranchSelector = ({ input, label, meta: {valid, dirty, active, touched, error } }) =>{
  
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
      {touched && error && <span className='input-field--value-error'>{error}</span>}
  </div>
  );
}
  