import React from 'react';
import { Field, reduxForm } from 'redux-form';

const CreatePost = (props) => {
    const renderTextArea = ({input, label }) => {
        return(
            <div className='input-textarea'>
                {/* <label className='label'>{label}</label> */}
                <textarea className='text-field' {...input} placeholder={label} ></textarea>
            </div>
        );
    }

    const onFormSubmit = (formValues) => {
        console.log(formValues);
    }

    return(
        <div className='create-post'>
            <div className='heading'>Create Post</div>
            <form className='createpost' onSubmit={props.handleSubmit(onFormSubmit)}>
                <Field name='newPost' component={renderTextArea} label='Write Something Here...' />
                <button>Post</button>
                
            </form>
        </div>
    );
}

const formWrapper = reduxForm({
    form: 'Create Post', 
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(CreatePost);

export default formWrapper;