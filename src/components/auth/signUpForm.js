import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import SignUpFormFirstPage from './signUpFormFirstPage';
import SignUpFormSecondPage from './signUpFormSecondPage';

//actions
import { getData, signUpAction } from '../../actions';
import{ headerDisplay } from '../../actions/headerAction'

//images
import signUpImage1 from "../../images/signup.png";
// import signUpImage2 from "../../images/signup-img2.png";

class SignUpForm extends React.Component{
    state = {
        page: 1,
        width: '33%',
        formValues: {}
    }
      
    componentDidMount() {
        this.props.headerDisplay('hide')
        window.onbeforeunload = function() {
            this.onUnload();
            return "";
        }.bind(this);
    }

    onUnload(event) { 
        alert('page Refreshed')
    };


    nextPage = (formValues) => {
        this.setState({ formValues: {...this.state.formValues, ...formValues}})
        console.log(formValues)
        this.setState({ page: this.state.page + 1, width: '66%' });
    }

    previousPage = () => {
        this.setState({ page: this.state.page - 1 });
    }

    onSubmitForm = (formValues) => {
        this.setState({ width: '100%'})
        const values = {...this.state.formValues, ...formValues}
        this.props.signUpAction(values)
        console.log({...this.state.formValues, ...formValues});
    }

    render(){
        const { page } = this.state;
        const { userData } = this.props;
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
                            <div className='page-content--heading'>Welcome {userData.data ? userData.data.firstName : null } </div>
                            <div className='page-content--details'>
                                {this.state.page === 1 && <ul>
                                    <li> All the details are taken from Official University Records </li>
                                    <li> In case of any wrong Detail. Please Contact Academics Office</li>
                                    <li> Please Confirm your details by checking the chechbox</li>
                                </ul>}
                                {this.state.page === 2 && <ul>
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
                            <div className='progress' style={{ width: this.state.width }}></div>
                        </div>
                        { page === 1 && <SignUpFormFirstPage onSubmit={this.nextPage} />}
                        {page === 2 && (
                            <SignUpFormSecondPage
                                previousPage={this.previousPage}
                                onSubmit={this.onSubmitForm}
                            />
                        )}
                    </div>
                </div>    
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userData: store.userData,
        joinForm: store.form.join
    }
}

export default connect(mapStateToProps,{
    getData,
    headerDisplay,
    signUpAction
})(SignUpForm);