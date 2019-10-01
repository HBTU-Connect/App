import React from 'react';

const renderField = ({ input, label, type, input: { value }, meta: {pristine, valid, dirty, active, touched, error } }) => (
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
  
export default renderField;