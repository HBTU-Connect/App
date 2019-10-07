import React from 'react';
import { Field } from 'redux-form';


//images
import eyeOpenImage from '../../images/eye-open.png';
import eyeClosedImage from '../../images/eye-closed.png';

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

export const userField = ({ input, id, showPassword, label, type, input: { value }, meta: {pristine, valid, dirty, active, touched, error } }) =>{
  
  
  return (
  <div className='user-field'>
    { (active || touched ) && id === 'password' && (type === 'password'?
     <div className='password-show' ><img className='password' onClick={showPassword} src={eyeOpenImage} alt='show'/></div>:
    <div className='password-show' ><img className='password' onClick={showPassword} src={eyeClosedImage} alt='show'/></div>) }
      
    <div >
      <input 
          className={ value || dirty || active ? (valid ? 'user-field--value touched' : 'user-field--value error') : 'user-field--value'}
          {...input} 
          type={type}
          disabled={value && pristine ? true : false } 
          spellCheck="false"
          
      />
      {touched && error && <span className='user-field--value-error'>{error}</span>}
    </div>
    <label className={ value || dirty || active ? 'user-field--label touched' : 'user-field--label'}>
          {label}
      </label>
  </div>
);
}

export const renderRadioButton = ({ input: { value }, meta: {pristine, dirty, active, touched, error } }) =>{
  return(
      <div className='input-field--radio'>
      <label className={  dirty || active ? ( value=== 'male' ? 'input-field--radio--label touched male': 'input-field--radio--label' ) : 'input-field--radio--label'}>
          <Field name="sex" component='input' type="radio" value="male" disabled={value && pristine ? true : false } />{' '}
          Male
          <span className="checkmark"></span>
      </label>
      <label className={ dirty || active ? ( value=== 'female' ? 'input-field--radio--label touched female': 'input-field--radio--label' ) : 'input-field--radio--label'}>
          <Field name="sex" component='input' type="radio" value="female" disabled={value && pristine ? true : false } />{' '}
          Female
          <span className="checkmark"></span>
      </label>
      <label className={ dirty || active ? ( value=== 'other' ? 'input-field--radio--label touched other': 'input-field--radio--label' ) : 'input-field--radio--label'}>
          <Field name="sex" component='input' type="radio" value="other" disabled={value && pristine ? true : false } />{' '}
          Other
          <span className="checkmark"></span>
      </label>
      {touched && error ? <span className='input-field--value-error'>{error}</span> : false}
      </div>
  );
}



export const renderYearSelector = ({ input, label, input: { value }, meta: {pristine, valid, dirty, active, touched, error } }) =>{
  
  const years = ['First', 'Second', 'Third', 'Final'];

  return(
  <div className='input-field'>
      <label className={value || dirty || active ? 'input-field--label touched' : 'input-field--label'}>
          {label}
      </label>
    <select
     {...input}
     className={value || dirty || active ? (valid ? 'input-field--value touched' : 'input-field--value error') : 'input-field--value'}

     disabled={value && pristine ? true : false }
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

export const renderBranchSelector = ({ input, label, input: { value }, meta: {pristine, valid, dirty, active, touched, error } }) =>{
  
  const branch = ['BioChemical Engg.','Computer Sc. & Engg.', 'Chemical Engg.', 'Civil Engg.', 'Electrical Engg.', 'Electronics Engg.']
  const branchCode = ['BE', 'CSE', 'CHE', 'CE', 'EE', 'ET', 'ME', 'LT', 'PT', 'FT', 'PL'];

  return(
  <div className='input-field'>
      <label className={value || dirty || active ? 'input-field--label touched' : 'input-field--label'}>
          {label}
      </label>
      <select
       {...input}
       className={value || dirty || active ? (valid ? 'input-field--value touched' : 'input-field--value error') : 'input-field--value'}

       disabled={value && pristine ? true : false }
      >
          <option value=""> </option>
          {branch.map((val, index) => (
          <option value={branchCode[index]} key={val}>
              {val}
          </option>
          ))}
      </select>
      {touched && error && <span className='input-field--value-error'>{error}</span>}
  </div>
  );
}

export const checkBox = ({ input, label, id, classname, type, input: { value }, meta: {pristine, valid, dirty, active, touched, error } }) => {
    return(
          <div className='input-field checkbox'>
            <label htmlFor={ value ? `${id} checked` : id } className={ value ? `${classname} checked` : classname}>
              <span></span>
            </label>{label}
            <div className='input-field--checkbox'>
              <input
                  id={ value ? `${id} checked` : id  }
                  type={type}
                  {...input}
              />
              
            </div>
            {touched && error && <span className='input-field--value-error'>{error}</span>}
          </div>
    );
}
  