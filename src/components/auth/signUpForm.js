import React from 'react';
import { Link } from 'react-router-dom';

import SignUpFormFirstPage from './signUpFormFirstPage';
import SignUpFormSecondPage from './signUpFormSecondPage';

class SignUpForm extends React.Component{
    state = {
        page: 1,
        width: '33%'
    }

    nextPage = () => {
        this.setState({ page: this.state.page + 1, width: '66%' });
    }

    previousPage = () => {
        this.setState({ page: this.state.page - 1 });
    }

    onSubmitForm = (formValues) => {
        this.setState({ width: '100%'})
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

export default SignUpForm;