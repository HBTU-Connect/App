import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';

//components
import SignUpFormFirstPage from './signUpFormFirstPage';
import SignUpFormSecondPage from './signUpFormSecondPage';
import { ChasingDotsSpinner } from '../utils/loadingSpinner'

//actions
import { getData, signUpAction } from '../../actions';
import{ headerDisplay } from '../../actions/headerAction'

//images
import signUpImage1 from "../../images/signup.png";
// import signUpImage2 from "../../images/signup-img2.png";

const SignUpForm = (props) => {
    const [ page, setPage ] = useState(1)
    const [ width, setWidth ] = useState('33%')
    const [ firstFormValues, setFirstFormValues ] = useState({})
    const [ secondFormValues, setSecondFormValues ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    // state = {
    //     page: 1,
    //     width: '33%',
    //     firstFormValues: {},
    //     secondFormValues: {},
    //     loading: false
    // }
      
    useEffect(() => {
        props.headerDisplay('hide')
        window.onbeforeunload = function() {
            onUnload();
            return "";
        };
        // eslint-disable-next-line
    },[])

    useEffect(() =>{
        if(!loading && props.authData && props.authData.type === 'signup' && props.authData.data){
            enqueueSnackbar(props.authData.data.message, {variant: 'success', autoHideDuration: 3000})
        }
        if(!loading && props.authData && props.authData.type === 'error' && props.authData.data){
            enqueueSnackbar(props.authData.error, {variant: 'error', autoHideDuration: 3000})

        }
        // eslint-disable-next-line
    }, [loading])

    const onUnload = (event) => { 
        alert('page Refreshed')
    };


    const nextPage = (formValues) => {
        setFirstFormValues( {...firstFormValues, ...formValues})
        // console.log(formValues)
        // this.setState({ page: this.state.page + 1, width: '66%' });
        setPage(page +1)
        setWidth('66%')
    }

    const previousPage = () => {
        // this.setState({ page: this.state.page - 1 });
        setPage(page-1)
    }

    const onSubmitForm = async (formValues) => {
        setLoading(true)
        setWidth('100%')
        setSecondFormValues({...secondFormValues ,...formValues})
        const values = {...firstFormValues, ...formValues}
        const response = await props.signUpAction(values)
        if(response){
            setLoading(false)
        }
        console.log({...firstFormValues, ...formValues});
    }

    // const { userData } = props;
    return(
        <div className='signup-page'>
            <img className='signup-icon' src={signUpImage1} alt='signUp1' />
            {/* <img className='signup-icon' src={signUpImage2} alt='signUp2' /> */}

            <div className='form'>
                <div className='left-floated'>
                    <div className='page-heading'>
                        Sign Up
                    </div>
                    <div className='divider'></div>
                    <div className='page-content'>
                        <div className='page-content--heading'>Welcome {firstFormValues ? firstFormValues.firstName : null } </div>
                        <div className='page-content--details'>
                            {page === 1 && <ul>
                                <li> All the details are taken from Official University Records </li>
                                <li> In case of any wrong Detail. Please Contact Academics Office</li>
                                <li> Please Confirm your details by checking the chechbox</li>
                            </ul>}
                            {page === 2 && <ul>
                                <li> Choose a Unique Username like you. </li>
                                <li> Username can only contain Underscores along with Alphabates and Numbers. </li>
                                <li> Please Select a strong Password that contains at least one Symbol, one Number, one Capital letter</li>
                                <li> In order to Continue both Passwords should Match.</li>
                            </ul>}
                        </div>
                    </div>
                    <div className='page-footer'>
                        <Link to='/terms' className='terms-link'>
                            Terms and Policies
                        </Link>
                        <Link to='/help' className='terms-link'>
                            Help
                        </Link>
                    </div>
                </div>
                <div className='right-floated'>
                    <div className='progress-bar'>
                        <div className='progress' style={{ width: width }}></div>
                    </div>
                    {loading && <div className='loader'>
                        <ChasingDotsSpinner />
                    </div>}
                    { page === 1 && <SignUpFormFirstPage previousValues={firstFormValues} onSubmit={nextPage} />}
                    {page === 2 && (
                        <SignUpFormSecondPage
                            previousPage={previousPage}
                            onSubmit={onSubmitForm}
                            initialValues = {secondFormValues}
                        />
                    )}
                </div>
            </div>    
        </div>
    );
}

const mapStateToProps = (store) => {
    return {
        userData: store.userData,
        joinForm: store.form.join,
        authData: store.authData
    }
}

export default connect(mapStateToProps,{
    getData,
    headerDisplay,
    signUpAction
})(SignUpForm);