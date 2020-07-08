import React from 'react';

//components
import JoinUsForm from './joinUsForm';
import Footer from '../welcome/footer';

//images
import joinusImage from '../../images/joinUs1.png';

const JoinUsPage = () => {
    return(
        <div className='joinus-page'>
            <div className='join-us__form'>
                <img src={joinusImage} alt='join us' />
                <div className='form-container__joinus'>
                    <JoinUsForm />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JoinUsPage; 