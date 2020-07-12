import React, { useEffect, useState} from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { ChasingDotsSpinner } from '../utils/loadingSpinner'
import { useSnackbar } from 'notistack';

//components
import validate from '../utils/validate';

//actions
import { getData } from '../../actions';


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

    useEffect(() => {
        const { userData } = props;
        if( userData.error && error  && !loading){
            enqueueSnackbar(userData.error.msg, {variant: 'error', autoHideDuration: 3000})
            setError(false)
            props.change("dob", null);
        }
        if( !userData.error && error  && !loading){
            enqueueSnackbar('Please fill all the details', {variant: 'info', autoHideDuration: 3000, style: { fontSize: '1.4rem'}})
            setError(false)
            props.change("dob", null);
        }
       // eslint-disable-next-line 
    },[loading])
    
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
        const response = await props.getData(formValues);
        if(response){
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        };
    }


    if(props.userData.data && !loading){
        return <Redirect to='/signup' />
    }

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

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        initialValues: { rollNumber: window.localStorage.getItem('rollNumber')}
    }
}

const connectProps =  connect(mapStateToProps, {
    getData
})(formWrapper);

export default withRouter(connectProps);