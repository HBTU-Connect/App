import React, { useState, useEffect } from 'react'
import { Field, FieldArray, reduxForm, formValueSelector, clearFields, autofill } from 'redux-form';
import { connect } from 'react-redux'
import { Button, TextField, RadioGroup, Radio, FormControlLabel, FormControl, Checkbox, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import { Quizzes } from '../quiz/sampleQuiz'
import { Redirect } from 'react-router-dom';

const GreenRadio = withStyles({
    root: {
    //   color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

const GreenCheckbox = withStyles({
root: {
    // color: green[400],
    '&$checked': {
    color: green[600],
    },
},
checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CustomTextField = withStyles({
root: {
    '& label.Mui-focused': {
    color: 'green',
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
    },
    '& .MuiInput-inputMultiline': {
        fontSize: '1.4rem'
    }
},
})(TextField);



const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
    <CustomTextField
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        InputProps={{
            resize:{
                fontSize: '1.4rem'
            }
          }}
        {...input}
        {...custom}
    />)

const radioButton = ({ input, question, ...rest}) => (
    <FormControl style={{ width: '100%' }}>
      <RadioGroup {...input}  {...rest}>
        {question.options.map((option, index) => {
            return <FormControlLabel style={input.value === option ? { color: 'green', paddingBottom: '.5rem', fontSize: '1.4rem'}: {color: 'rgb(65,65,65)', paddingBottom: '.5rem', fontSize: '1.4rem'}} key={index} id={`option-${index +1}`} value={option} control={<GreenRadio  />} label={option} />
        })}
      </RadioGroup>
    </FormControl>
  )

  const checkboxButton = ({ fields, question, questionindex, meta: { touched } }) => {
    return(
        <FormControl style={{ width: '100%' }}>
            {question.options.map( (option, index) => (
                <Field key={index} component={renderCheckBox} name={`answers[${questionindex}].[${index}]`} option={option} index={index} />
            ))}
        </FormControl>
    )
}

const renderCheckBox = ({ input, index, option }) => {
    return <FormControlLabel style={input.value? { color: 'green', paddingBottom: '0.5rem'}: { color: 'rgb(65,65,65)', paddingBottom: '0.5rem'}}  key={index+1} id={`multiselect-option${index+1}`}  control={<GreenCheckbox id={`checkbox ${index}`} {...input}  checked={input.value ? true : false}/>} label={option} />     
}

const RenderSelectField = ({ input, name, question, label, meta: { touched, error }, children, ...custom }) => {
    const [open, setOpen] = useState(false)

    return(
    <FormControl variant="outlined" error={touched && error} style={{ width: '50%'}}>
        <Select
        {...input}
        {...custom}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        value={input.value}
        style={{ fontSize: '1.4rem'}} 
        inputProps={{
            name: name,
            id: 'answer-native-simple',
            style: { fontSize: '1.4rem'}
        }}
        >
        {/* {children} */}
            <MenuItem value='' style={{ fontSize: '1.4rem'}} disabled>Your Answer</MenuItem>
            {question.options.map((option, index) => (
                <MenuItem style={{ fontSize: '1.4rem'}} key={index} value={option}>{option}</MenuItem>
            ))}
        </Select>
    </FormControl>
    )}

const RenderQuestions = ({ questions, color, error }) => {
    return questions.map((question, index) => {
        return(
            <div key={index} className='question-container' style={{ borderColor: `${color}`}}>
                <div className='question-container__question'>{question.question}{question.required && <span style={{ color: 'red'}}>*</span>}</div>
                <div className='question-container__field'>
                    {question.type === 'Multiple Choice' && <>
                        <Field name={`answers[${index}]`} component={radioButton} question={question} questionindex={index} />
                        {error[index] && <span style={{ fontSize: '1.4rem', color: 'red', paddingTop: '1rem' }}>*{error[index]}</span>}
                    </>}
                    {question.type === 'Short Answer' && <>
                        <Field name={`answers[${index}]`} label='Your Answer' id='textInput' component={renderTextField}  InputProps={{ style: { fontSize: '1.5rem', width: '100%' } }} />
                        {error[index] && <span style={{ fontSize: '1.4rem', color: 'red', paddingTop: '1rem'}}>*{error[index]}</span>}
                    </>}
                    {question.type === 'Long Answer' && <>
                        <Field name={`answers[${index}]`} component={renderTextField}  InputProps={{ style: { fontSize: '1.5rem', width: '100%' } }} label="Your Answer" multiline rowsMax="10" margin="normal" />
                        {error[index] && <span style={{ fontSize: '1.4rem', color: 'red', paddingTop: '1rem'}}>*{error[index]}</span>}
                    </>}
                    {question.type === 'Integer Type' && <>
                        <Field name={`answers[${index}]`} id='textInput'  component={renderTextField} type='number' InputProps={{ style: { fontSize: '1.5rem', width: '50%' } }} label="Your Answer" min={0} max={9} step={1}  />
                        {error[index] && <span style={{ fontSize: '1.4rem', color: 'red', paddingTop: '1rem'}}>*{error[index]}</span>}
                    </>}
                    {question.type === 'Multiple Select' && <>
                        <FieldArray name={`answers[${index}]`} component={checkboxButton}  question={question} questionindex={index}/>
                        {error[index] && <span style={{ fontSize: '1.4rem', color: 'red', paddingTop: '1rem'}}>*{error[index]}</span>}
                    </>}
                    {question.type === 'Drop-down' && <>
                        <Field name={`answers[${index}]`} component={RenderSelectField}  question={question} label='Your Answer' />
                        {error[index] && <span style={{ fontSize: '1.4rem', color: 'red', paddingTop: '1rem'}}>*{error[index]}</span>}
                    </>}
                </div>
            </div>
        )
    })
}

const RenderForm = (props) => {
    const [ form, setForm ] = useState({})
    const [ error, setError ] = useState([])
    const [ submitError, setSubmitError ] = useState('')

    useEffect(() => {
        Quizzes.map((form) => {
            if(form.id === parseInt(props.match.params.id)){
                setForm(form)
            }
        })
    }, [])

    useEffect(()=>{
        console.log(form.questions)
    }, [form])

    const onFormSubmit = (formValues) => {
        let newError = []
        if(form && form.questions){
            form.questions.map((question, index) => {
                if(question.required && (!formValues.answers || !formValues.answers[index])){
                    newError[index] = 'This Question is Required'
                }
            })
        }
        if(newError.length > 0){
            setError(newError)
            setSubmitError('Please Answer the Required Questions')
        }
        else{
            console.log(formValues)
        }
    }

    if(!form){
        return(
            <div><h1>Loading...</h1></div>
        )
    }
    if(form.settings && form.settings.quiz){
        return <Redirect to={`/event/quiz/${form.id}`} />
    }
    return(
        <div className='body-container render-form' style={{ backgroundColor: `${form.color}1f`}}>
            <form className='event-form-container' onSubmit={props.handleSubmit(onFormSubmit)}>
                <div className='form-header' style={{ borderColor: `${form.color}`}}>
                    <span className='form-title' style={{ color: `${form.color}`}}>{form.formTitle}</span>
                    <span className='form-description'>
                        {form.formDescription}
                    </span>
                </div>
                {form.questions && <RenderQuestions questions={form.questions} color={form.color} error={error}/>}
                <div className='button-container'>
                    <Button color='primary' variant="contained" style={{fontSize: '1.4rem'}} size='large' type="submit">Submit</Button>
                    {submitError && <span style={{ fontSize: '1.4rem', color: 'red', marginTop: '1.5rem'}}> *{submitError} </span>}
                </div>
            </form>
        </div>
    )
}
const selector = formValueSelector('formResponse')

const mapStateToProps = (state) =>{
    const answers = selector(state, 'answers')
    return{
        answers
    }
}
export default connect(mapStateToProps, { clearFields, autofill })(reduxForm({ form: 'formResponse'})(RenderForm));