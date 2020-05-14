import React, { useState, useEffect } from 'react';
import { Field, FieldArray, reduxForm, formValueSelector, clearFields } from 'redux-form';
import { connect } from 'react-redux'
import { Button, TextField, IconButton, RadioGroup, Radio, FormControlLabel, FormControl, Checkbox, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
// import CountDown from '../../../../utils/timer';
import Timer from 'react-compound-timer';

import { Quizzes } from './sampleQuiz'

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
        autoFocus
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

const radioButton = ({ input, Quiz, currentQuestion, ...rest}) => (
    <FormControl>
      <RadioGroup {...input} {...rest}>
        {Quiz.questions[currentQuestion].options.map((option, index) => {
            return <FormControlLabel style={input.value === option ? { color: 'green', paddingBottom: '.5rem'}: { paddingBottom: '.5rem'}} key={index} id={`option-${index +1}`} value={option} control={<GreenRadio />} label={option} />
        })}
      </RadioGroup>
    </FormControl>
  )

  const checkboxButton = ({ fields, Quiz, currentQuestion, meta: { touched } }) => {
    return(
        <FormControl>
            {Quiz.questions[currentQuestion].options.map( (option, index) => (
                <Field key={index} component={renderCheckBox} name={`answers[${currentQuestion}].[${index}]`} option={option} index={index} />
            ))}
        </FormControl>
    )
}

const renderCheckBox = ({ input, index, option }) => {
    return <FormControlLabel style={input.value? { color: 'green', paddingBottom: '.5rem'}: { paddingBottom: '.5rem'}}  key={index+1} id={`multiselect-option${index+1}`}  control={<GreenCheckbox id={`checkbox ${index}`} {...input}  checked={input.value ? true : false}/>} label={option} />     
}



const renderSelectField = ({ input, name, Quiz, currentQuestion, open, handleClose, handleOpen, label, meta: { touched, error }, children, ...custom }) => (
    <FormControl variant="outlined" error={touched && error}>
        <Select
        {...input}
        {...custom}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
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
            {Quiz.questions[currentQuestion].options.map((option, index) => (
                <MenuItem style={{ fontSize: '1.4rem'}} key={index} value={option}>{option}</MenuItem>
            ))}
        </Select>
    </FormControl>
    )



const RenderAnswerContainer = ({Quiz, currentQuestion, onClearClick}) => {
    const [open, setOpen] = useState(false)

    

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleOpen = () => {
        setOpen(true);
    };
    return(
        <>
        {Quiz.questions[currentQuestion].type === 'Multiple Choice' && <>
            <div className='answer-container__heading'>
                <span>Select the Correct Option</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
            <Field name={`answers[${currentQuestion}]`} component={radioButton} Quiz={Quiz} currentQuestion={currentQuestion} />
            
        </>}
        {Quiz.questions[currentQuestion].type === 'Short Answer' && <>
            <div className='answer-container__heading'>
                <span>Enter your Answer Here</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
            <Field name={`answers[${currentQuestion}]`} label='Your Answer' component={renderTextField} InputProps={{ style: { fontSize: '1.5rem' } }} />
        </>}
        {Quiz.questions[currentQuestion].type === 'Long Answer' && <>
            <div className='answer-container__heading'>
                <span>Enter your Answer Here (Long Answer)</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
            <Field name={`answers[${currentQuestion}]`} component={renderTextField} InputProps={{ style: { fontSize: '1.5rem' } }} label="Your Answer" multiline rowsMax="10" margin="normal" />
        </>}
        {Quiz.questions[currentQuestion].type === 'Integer Type' && <>
            <div className='answer-container__heading'>
                <span>Select an Integer</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
                <Field name={`answers[${currentQuestion}]`} component={renderTextField} type='number' InputProps={{ style: { fontSize: '1.5rem', width: '10%' } }}  min={0} max={9} step={1}  />
        </>}
        {Quiz.questions[currentQuestion].type === 'Multiple Select' && <>
            <div className='answer-container__heading'>
                <span>Select Correct Options</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
            <FieldArray name={`answers[${currentQuestion}]`} component={checkboxButton} Quiz={Quiz} currentQuestion={currentQuestion}/>
        </>}
        {Quiz.questions[currentQuestion].type === 'Drop-down' && <>
            <div className='answer-container__heading'>
                <span>Select Correct Option</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
            <Field name={`answers[${currentQuestion}]`} component={renderSelectField} open={open} handleOpen={handleOpen} handleClose={handleClose} Quiz={Quiz} currentQuestion={currentQuestion} label='Your Answer' />
        </>}
        </>
    )
}

const RenderQuiz = (props) => {
    const [ currentQuestion, setCurrrentQuestion] = useState(0)
    const [ Quiz, setQuiz ] = useState([])
    const [ nextCursor, setNextCursor ] = useState('pointer')
    const [ previousCursor, setPreviousCursor ] = useState('not-allowed')
    const [ activeClassName, setActiveClassName] = useState([])
    const [ ClassNames, setClassNames] = useState([])
    const [ questionLoading, setQuestionLoading ] = useState([true])
    const [ timerClass, setTimerClass ] = useState('green')
    let newActiveClassName = []
    let newClassNames = []

    useEffect(() => {
        setQuestionLoading(false)
        setTimeout(() => {
            setQuestionLoading(true)
        }, 500 )
        setTimerClass('green')
        newActiveClassName[currentQuestion] = 'active';
        setActiveClassName(newActiveClassName);
        if(currentQuestion ===0 ){
            setPreviousCursor('not-allowed')
        }else{
            setPreviousCursor('pointer')
        }
        if(Quiz.questions){
            if(currentQuestion === Quiz.questions.length -1){
                setNextCursor('not-allowed')
            }else{
                setNextCursor('pointer')
            }

            for(let i=0; i< Quiz.questions.length; i++){
                newClassNames[i] = undefined
                if(props.answers && props.answers[i]){
                    newClassNames[i] = 'attempted'
                }
            }
            setClassNames(newClassNames)
            
        }

        //eslint-disable-next-line
    }, [currentQuestion])

    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(Quiz.color),
          backgroundColor: Quiz.color,
          '&:hover': {
            backgroundColor: Quiz.color,
          },
        },
      }))(Button);
    
    const RenderQuestionTag = () => {

        const handleClick = (index) => {
            if(Quiz.questions[index].time){
                return null
            }
            setCurrrentQuestion(index)
        }
        return(
            Quiz.questions.map((question, index) => (
                <div id={index} key={ index } className={`question-tag-area ${activeClassName[index]} ${ClassNames[index]}`} onClick={() => { handleClick(index) }}>{index +1}</div>
            ))
        )
    }

    useEffect(() => {
        //eslint-disable-next-line
        Quizzes.map((quiz) => {
            if(quiz.id === parseInt(props.match.params.id)){
                setQuiz(quiz)
            }
        })
        //eslint-disable-next-line
    }, [])

    const onFormSubmit = (formValues) => {
        console.log(formValues)
    }

    
    
    const onClearClick = (event, currentQuestion) => {
        event.preventDefault()
        props.clearFields('quizResponse', true, false,`answers[${currentQuestion}]`)
        console.log('clear')
    }

    const renderTimer = () => {
        const quizTime = Quiz.questions[currentQuestion].time
        const seconds = parseInt(quizTime.split(':')[2])
        const minutes = parseInt(quizTime.split(':')[1])
        const hours = parseInt(quizTime.split(':')[0])
        const startTime = (hours*60*60 + minutes*60 + seconds)*1000
        return(
            <Timer
                initialTime={startTime}
                direction="backward"
                lastUnit="h"
                checkpoints={[
                    {
                        time: startTime - 30000,
                        callback: () => {setTimerClass('yellow')}
                    },
                    {
                        time: 30000,
                        callback: () => {setTimerClass('red')}
                    },
                    {
                        time: 10000,
                        callback: () => {setTimerClass('red blink')}
                    },
                    {
                        time: 0,
                        callback: () => {setCurrrentQuestion(currentQuestion +1)},
                    }
                ]}
            >
                    <Timer.Hours />{' : '}<Timer.Minutes />{' : '}<Timer.Seconds />
            </Timer>
    )}


    if(Quiz.length === 0 ){
        return <div className='body-container'><h1>Loading...</h1></div>
    }
    return(
        <div className='body-container render-quiz'>
            <form className='event-container' onSubmit={props.handleSubmit(onFormSubmit)} >
            <div className='event-container__left' style={{ backgroundColor: `${Quiz.color}1f`}}>
                <div className='quiz-header'>
                    <span className='quiz-title' style={{ color: `${Quiz.color}`}}>
                        {Quiz.formTitle}
                    </span>
                    <span className='quiz-description'>
                        {Quiz.formDescription}
                    </span>
                </div>
                <div className='quiz-questions'>
                    {RenderQuestionTag()}
                </div>
                <div className='quiz-footer'>
                    <ColorButton variant="contained" style={{fontSize: '1.4rem'}} size='large' type="submit">Submit</ColorButton>
                </div>
            </div>
            <div className='event-container__right' style={{ backgroundColor: `${Quiz.color}1f`}}>
                {Quiz.questions[currentQuestion].time && questionLoading && <div className={`timer-container ${timerClass}`} style={{ borderColor: `${Quiz.color}`}}>
                    {renderTimer()}
                </div>}
                <div className='question-container' style={{ borderColor: `${Quiz.color}`}}>
                    <span className='question-container__question'>{Quiz.questions[currentQuestion].question}</span>
                    <span className='question-container__points'>{Quiz.questions[currentQuestion].points} Points</span>
                    
                </div>
                <div className='answer-container' style={{ borderColor: `${Quiz.color}`}}>
                    
                        {<RenderAnswerContainer Quiz={Quiz} currentQuestion={currentQuestion} onClearClick={onClearClick} />}
                    
                </div>
                <div className='nav-container'>
                    <button className='btn prev-btn' style={previousCursor === 'not-allowed' ? { cursor: `${previousCursor}`, backgroundColor: 'rgb(235, 235, 235)', color: `${Quiz.color}`}: { cursor: `${previousCursor}`, backgroundColor: 'rgb(255, 255, 255)', color: `${Quiz.color}`}} onClick={(e) => {e.preventDefault(); if(currentQuestion > 0)setCurrrentQuestion(currentQuestion -1)}}>Previous</button>
                    <button className='btn left-btn' style={nextCursor === 'not-allowed' ? { cursor: `${nextCursor}`, backgroundColor: 'rgb(235, 235, 235)', color: `${Quiz.color}`}: { cursor: `${nextCursor}`, backgroundColor: 'rgb(255, 255, 255)', color: `${Quiz.color}`}} onClick={(e) => {e.preventDefault(); if(currentQuestion < Quiz.questions.length -1)setCurrrentQuestion(currentQuestion +1)}}>Next</button>
                </div>
            </div>
            </form>
        </div>
    )
}
const selector = formValueSelector('quizResponse')

const mapStateToProps = (state) =>{
    const answers = selector(state, 'answers')
    return{
        answers
    }
}

export default connect(mapStateToProps, { clearFields })(reduxForm({ form: 'quizResponse'})(RenderQuiz));
