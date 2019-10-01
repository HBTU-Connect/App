import React from 'react';
import { Link } from 'react-router-dom';

import SignUpFormFirstPage from './signUpFormFirstPage';
import SignUpFormSecondPage from './signUpFormSecondPage';

class SignUpForm extends React.Component{
    state = {
        page: 1
    }

    nextPage = () => {
        this.setState({ page: this.state.page + 1 });
    }

    previousPage = () => {
        this.setState({ page: this.state.page - 1 });
    }

    onSubmitForm = (formValues) => {
        console.log(formValues);
    }

    render(){
        const { page } = this.state;
        return(
            <div className='signup-page'>
                <div className='form'>
                    <div className='left-floated'>
                        <div className='page-heading'>
                            Sign Up
                        </div>
                        <div className='divider'></div>
                        <div className='page-footer'>
                            <Link to='/terms' className='terms-link'>
                                Terms and Policies
                            </Link>
                        </div>
                    </div>
                    <div className='right-floated'>
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

export default SignUpForm;