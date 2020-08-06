import React, { useEffect, useState} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ChasingDotsSpinner } from '../utils/loadingSpinner'
import { useSnackbar } from 'notistack';

//components
import validate from '../utils/validate';

//actions
// import { getData } from '../../actions';


const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('rgb(0, 88, 136)'),
      backgroundColor: 'rgb(0, 88, 136)',
      '&:hover': {
        backgroundColor: 'rgb(0, 88, 140)',
      },
    },
  }))(Button);

const JoinUsForm  = (props) => {
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    
    const renderField = ({ input, label, type,input: { value }, meta: { valid, dirty, active, touched, error } }) => (
        <div className='input-field'>
            <label className={value || dirty || active ? 'input-field--label touched' : 'input-field--label'}>
                {label}
            </label>
            <input 
                className={ value || dirty || active ? (valid ? 'input-field--value touched' : 'input-field--value error') : 'input-field--value'}
                {...input} 
                type={type}
            />
            {touched && error && <span className='input-field--value-error'>{error}</span>}
        </div>
    );
    
    const onFormSubmit = async (formValues) => {
        setLoading(true)
        setError(true)
        window.localStorage.setItem('rollNumber', formValues.rollNumber);
        
        //add action here to add roll no. to global store
        setLoading(false)
    }


    // if( !loading){
    //     return <Redirect to='/signup' />
    // }

    return(
        <>

        <div className='signup-form-container'>     
            <div className='form-container__joinus'>
                <div className='form-heading'>
                    <span className='form-heading-primary'>Join Us</span>
                    <span className='form-heading-secondary'>And Connect with your Mates</span>
                </div>
                <form className='join-us' onSubmit={props.handleSubmit(onFormSubmit)}>
                    <Field name='rollNumber' type='text' component={renderField} label='Roll Number' />
                    {/* <Field name='dob' type='date' component={renderField} label='DOB' /> */}
                    <ColorButton type='submit' >Join Us</ColorButton>
                </form>
                {loading && <div className='loader'><ChasingDotsSpinner /> </div>}
            </div>
        </div>
        </>
    )
}

const formWrapper = reduxForm({
    form: 'join', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true,
    validate
})(JoinUsForm);

// const mapStateToProps = (state) => {
//     return {
//         userData: state.userData,
//         initialValues: { rollNumber: window.localStorage.getItem('rollNumber')}
//     }
// }

export default withRouter(formWrapper);