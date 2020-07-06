import React, { useState, useEffect } from 'react';
import { Field, FieldArray, reduxForm, formValueSelector, clearFields, autofill } from 'redux-form';
import { connect } from 'react-redux'
import { Button, TextField, RadioGroup, Radio, FormControlLabel, FormControl, Checkbox, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Timer from 'react-compound-timer';
import { Check as CheckIcon,
        Clear as ClearIcon,
        RadioButtonChecked as RadioButtonCheckedIcon,
        RadioButtonUnchecked as RadioButtonUncheckedIcon,
        CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
        CheckBox as CheckBoxIcon
} from '@material-ui/icons';

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



const renderTextField = ({ label, input, required, meta: { touched, invalid, error }, ...custom }) => (
    <CustomTextField
        autoFocus
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        required={required}
        InputProps={{
            resize:{
                fontSize: '1.4rem'
            }
          }}
        {...input}
        {...custom}
    />)

const radioButton = ({ input, required, questions, currentQuestion, ...rest}) => (
    <FormControl>
      <RadioGroup {...input}  {...rest}>
        {questions[currentQuestion].options.map((option, index) => {
            return <FormControlLabel style={input.value === option ? { color: 'green', paddingBottom: '.5rem'}: { paddingBottom: '.5rem'}} key={index} id={`option-${index +1}`} value={option} control={<GreenRadio  required={required} />} label={option} />
        })}
      </RadioGroup>
    </FormControl>
  )

  const checkboxButton = ({ fields, questions, currentQuestion, meta: { touched } }) => {
    return(
        <FormControl>
            {questions[currentQuestion].options.map( (option, index) => (
                <Field key={index} component={renderCheckBox} name={`answers[${currentQuestion}].[${index}]`} option={option} index={index} />
            ))}
        </FormControl>
    )
}

const renderCheckBox = ({ input, index, option }) => {
    return <FormControlLabel style={input.value? { color: 'green', paddingBottom: '.5rem'}: { paddingBottom: '.5rem'}}  key={index+1} id={`multiselect-option${index+1}`}  control={<GreenCheckbox id={`checkbox ${index}`} {...input}  checked={input.value ? true : false}/>} label={option} />     
}



const renderSelectField = ({ input, name, questions, currentQuestion, open, handleClose, handleOpen, label, meta: { touched, error }, children, ...custom }) => (
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
            {questions[currentQuestion].options.map((option, index) => (
                <MenuItem style={{ fontSize: '1.4rem'}} key={index} value={option}>{option}</MenuItem>
            ))}
        </Select>
    </FormControl>
    )



const RenderAnswerContainer = ({questions, currentQuestion, onClearClick, autofill}) => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleOpen = () => {
        setOpen(true);
    };
    return(
        <>
        {questions[currentQuestion].type === 'Multiple Choice' && <>
            <div className='answer-container__heading'>
                <span>Select the Correct Option</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
            <Field name={`answers[${currentQuestion}]`} component={radioButton} questions={questions} currentQuestion={currentQuestion} />
            
        </>}
        {questions[currentQuestion].type === 'Short Answer' && <>
            <div className='answer-container__heading'>
                <span>Enter your Answer Here</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
            <Field name={`answers[${currentQuestion}]`} label='Your Answer' id='textInput' component={renderTextField} required={questions[currentQuestion].required} InputProps={{ style: { fontSize: '1.5rem' } }} />
        </>}
        {questions[currentQuestion].type === 'Long Answer' && <>
            <div className='answer-container__heading'>
                <span>Enter your Answer Here (Long Answer)</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
            <Field name={`answers[${currentQuestion}]`} component={renderTextField} required={questions[currentQuestion].required} InputProps={{ style: { fontSize: '1.5rem' } }} label="Your Answer" multiline rowsMax="10" margin="normal" />
        </>}
        {questions[currentQuestion].type === 'Integer Type' && <>
            <div className='answer-container__heading'>
                <span>Select an Integer</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
                <Field name={`answers[${currentQuestion}]`} id='textInput' required={questions[currentQuestion].required} component={renderTextField} type='number' InputProps={{ style: { fontSize: '1.5rem', width: '10%' } }}  min={0} max={9} step={1}  />
        </>}
        {questions[currentQuestion].type === 'Multiple Select' && <>
            <div className='answer-container__heading'>
                <span>Select Correct Options</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
            <FieldArray name={`answers[${currentQuestion}]`} component={checkboxButton} required={questions[currentQuestion].required} questions={questions} currentQuestion={currentQuestion}/>
        </>}
        {questions[currentQuestion].type === 'Drop-down' && <>
            <div className='answer-container__heading'>
                <span>Select Correct Option</span>
                <Button color='primary' style={{fontSize: '1.3rem'}} onClick = {(e) => onClearClick(e, currentQuestion)}>Clear Value</Button>
            </div>
            <Field name={`answers[${currentQuestion}]`} component={renderSelectField} open={open} required={questions[currentQuestion].required} handleOpen={handleOpen} handleClose={handleClose} questions={questions} currentQuestion={currentQuestion} label='Your Answer' />
        </>}
        </>
    )
}

const renderCorrectAnswers = (questions, answers, correctAnswersArray) => {
    console.log(correctAnswersArray)
    return questions.map((question, index) => {
        return(
            <div key={index} className='question-container' style= { correctAnswersArray[index] ? { borderColor: 'green'} : { borderColor: 'red'} }>
                <div className='question-container__question'>
                    <span className={`question-container__question-span`} style= { correctAnswersArray[index] ? { color: 'green'} : { color: 'red'} }>{question.question}</span>
                    <span className='question-tick'>{correctAnswersArray[index] ? <CheckIcon fontSize='large' style={{ color: 'green', marginLeft: '2rem'}} /> : <ClearIcon fontSize='large' style={{ color: 'red', marginLeft: '2rem' }}/>}</span>
                </div>
                <div className='question-container__answer'>
                {(question.type === 'Multiple Choice' || question.type === 'Drop-down') && <ul>
                    {question.options.map(( option, optionIndex) => {
                        return(
                            <li 
                            key={optionIndex} className={answers && answers[index] && option === answers[index] ? ( answers[index] === question.answer ? 'correct' : 'incorrect'): 'other'}
                            >
                                {answers && answers[index] && option === answers[index] ? <RadioButtonCheckedIcon fontSize='large' style={{ marginRight: '1rem'}} /> : <RadioButtonUncheckedIcon fontSize='large' style={{ marginRight: '1rem'}}/>} <span>{option}</span>{answers && answers[index] && option === answers[index] ? (correctAnswersArray[index] ? <CheckIcon fontSize='large' style={{ color: 'green'}} /> : <ClearIcon fontSize='large' style={{ color: 'red'}}/>) : null }
                            </li>
                        )
                    })}    
                </ul>}
                {(question.type === 'Multiple Select') && <ul>
                    {question.options.map(( option, optionIndex) => {
                        return(
                            <li 
                            key={optionIndex} className={answers && answers[index] && answers[index][optionIndex] ? ( question.answer[optionIndex] ? 'correct' : 'incorrect'): 'other'}
                            >
                                {(answers && answers[index] && answers[index][optionIndex]) ? <CheckBoxIcon fontSize='large' style={{ marginRight: '1rem'}} /> : <CheckBoxOutlineBlankIcon fontSize='large' style={{ marginRight: '1rem'}}/>} <span>{option}</span>{answers && answers[index] && answers[index][optionIndex] ? (question.answer[optionIndex] ? <CheckIcon fontSize='large' style={{ color: 'green'}} /> : <ClearIcon fontSize='large' style={{ color: 'red'}}/>) : null }
                            </li>
                        )
                    })}    
                </ul>}
                {(question.type === 'Short Answer' || question.type === 'Integer Type') && <ul className='answers-short-answer'>
                    <li className={correctAnswersArray[index] ? 'correct' : 'incorrect'}><ul><li>{answers && answers[index]}</li> </ul>{correctAnswersArray[index]  ? <CheckIcon fontSize='large' style={{ color: 'green'}} /> : <ClearIcon fontSize='large' style={{ color: 'red'}}/>}</li>    
                </ul>}
                {(question.type === 'Long Answer') && <ul className='answers-long-answer'>
                    <li className={correctAnswersArray[index] ? 'correct' : 'incorrect'}>{answers && answers[index]}</li>    
                </ul>}
                </div>
                {!correctAnswersArray[index] && question.type !== 'Long Answer' && <div className='question-container__correct-answer'>
                    <span className='question-container__correct-answer__heading'>Correct Answer</span>
                    {(question.type === 'Multiple Select') && <ul>
                    {question.options.map((option, optionIndex) => {
                        return(<>
                            {question.answer[optionIndex] && <li key={optionIndex} className='question-container__correct-answer__answers'><CheckBoxIcon fontSize='large' style={{ marginRight: '1rem'}}/> <span>{option} </span></li>}
                            </>
                        )
                    })}
                    </ul>}
                    {(question.type === 'Multiple Choice' || question.type === 'Drop-down') && <span className='question-container__correct-answer__answers'>
                    <RadioButtonCheckedIcon fontSize='large' style={{ marginRight: '1rem'}}/> <span>{question.answer} </span>
                        </span>}
                    {question.type === 'Short Answer' && <span className='question-container__correct-answer__answers'>{question.answer.join(', ')}</span>}
                    {question.type === 'Integer Type' && <span className='question-container__correct-answer__answers'>{question.answer}</span>}
                </div>}
            </div>
        )
    })
}

const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
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
    const [ start, setStart ] = useState(false)
    const [ questions, setQuestions ] = useState([])
    const [ submitted, setSubmitted ] = useState(false)
    const [ score, setScore ] = useState(0)
    const [ correctAnswers, setCorrectAnswers ] = useState(false)
    const [ correctAnswersArray, setCorrectAnswersArray ] = useState([])
    const [ scheduled , setScheduled ] = useState(true)
    const [ scheduleTime, setScheduleTime ] = useState(0)
    
    let newActiveClassName = []
    let newClassNames = []

    useEffect(() => {
        //eslint-disable-next-line
        Quizzes.map((quiz) => {
            if(quiz.id === parseInt(props.match.params.id)){
                setQuiz(quiz)
            }
        })
        // setQuestions(newQuestions)

        // window.addEventListener('keypress', (e) => {
        //     if(e.which === '13'){
        //         e.preventDefault()
        //     }
        // } )
        
        
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(Quiz && Quiz.settings){
            console.log(Quiz.settings)
            if(Quiz.settings.schedule){
                let quizDate = new Date(Quiz.schedule)
                let today = new Date().getTime()

                quizDate =  quizDate.getTime()
                console.log(quizDate -today)
                if((quizDate - today) < 0){
                    setScheduled(false)
                }
                else{
                    setScheduleTime(quizDate - today)
                }
            }
            else{
                setScheduled(false)
            }
        }
    }, [Quiz])

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
            questions.map((question, index) => (
                <div id={index} key={ index } className={`question-tag-area ${activeClassName[index]} ${ClassNames[index]}`} onClick={() => { handleClick(index) }}>{index +1}</div>
            ))
        )
    }

    

    useEffect(() => {
        if(Quiz.questions && Quiz.questions.length > 0 && !submitted){
            if(Quiz.settings.shuffle){
                const newQuestions = shuffle(Quiz.questions)
                setQuestions(newQuestions)
            }
            else{
                setQuestions(Quiz.questions)
            }
            // console.log(Quiz)
            // if(document.getElementById("myForm")){
            // document.getElementById("myForm").onkeypress = function(e) {
            //     var key = e.charCode || e.keyCode || 0;     
            //     if (key === 13) {
            //       e.preventDefault();
            //     }
            //   }
            // }
        }
        // eslint-disable-next-line
    }, [Quiz])

    const onFormSubmit = (formValues) => {
        console.log(formValues)
        const score = calculateScore(formValues.answers)
        setScore(score)
        setSubmitted(true)
    }

    const totalPoints = () => {
        let points = 0
        //eslint-disable-next-line
        questions.map(( q, i) => {
            if(q.points){
                points = points + q.points
            }
        })

        return points
    }

    const calculateScore = (answers) => {
        let newCorrectAnswersArray = []
        let score = 0;
        if(answers){
            //eslint-disable-next-line
            answers.map(( ans, index) => {
                if( questions[index].type === 'Short Answer' && questions[index].answer.includes(ans)){
                        score = score + questions[index].points
                        newCorrectAnswersArray[index] = true
                        console.log('correct', index)
                }
                if( questions[index].type === 'Multiple Select' && ans){
                    let flag = 0
                    for(let i =0; i< ans.length; i++) {
                        if(ans[i] !== questions[index].answer[i] && typeof ans[i] !== 'undefined' ){
                            flag = 1
                            console.log(i)
                        }
                    }
                    for(let i =0; i< questions[index].answer.length; i++) {
                        if( questions[index].answer[i] === true && typeof ans[i] === 'undefined'){
                            flag = 1
                            console.log(i)
                        }
                    }

                    if(flag === 0){
                        score=score + questions[index].points
                        newCorrectAnswersArray[index] = true
                        console.log('correct', index)
                    }
                }
                if(questions[index].type === 'Multiple Choice' && ans === questions[index].answer){
                    score = score + questions[index].points
                    newCorrectAnswersArray[index] = true
                    console.log('correct', index)
                }
                if(questions[index].type === 'Drop-down' && ans === questions[index].answer){
                    score = score + questions[index].points
                    newCorrectAnswersArray[index] = true
                    console.log('correct', index)
                }
                if(questions[index].type === 'Integer Type' && parseInt(ans) === parseInt(questions[index].answer)){
                    score = score + questions[index].points
                    newCorrectAnswersArray[index] = true
                    console.log('correct', index)
                }
            })
        }
        setCorrectAnswersArray(newCorrectAnswersArray)
        return score;
    }

    
    
    const onClearClick = (event, currentQuestion) => {
        event.preventDefault()
        props.clearFields('quizResponse', true, false,`answers[${currentQuestion}]`)
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
                        callback: () => {if(currentQuestion <  questions.length -1)setCurrrentQuestion(currentQuestion +1)},
                    }
                ]}
            >
                Next Question In: <Timer.Hours /> Hrs <Timer.Minutes /> Min <Timer.Seconds /> Sec
            </Timer>
    )}


    if(Quiz.length === 0 || (scheduled && scheduleTime === 0)){
        return <div className='body-container'><h1>Loading...</h1></div>
    }
    return(
        <>
        {scheduled && <div className='body-container' style={{ backgroundColor: `${Quiz.color}1f`}}>
            <div className='quiz-schedule-container'>
                <span className='quiz-title'>{Quiz.formTitle}</span> 
                <span className='quiz-description'>{Quiz.formDescription}</span>
                <div className='timer-container'>
                    <Timer
                        initialTime={scheduleTime}
                        direction="backward"
                        checkpoints={[
                            {
                                time: 0,
                                callback: () => { setScheduled(false)},
                            }
                        ]}
                    >
                    <span className='timer-container__heading'>Quiz Will Start In: </span><span className='timer-container__timer'><Timer.Days /> Days <Timer.Hours /> Hrs <Timer.Minutes /> Min <Timer.Seconds /> Sec</span>
                    </Timer>
                </div>
            </div>
        </div>}
        {!scheduled && <div className='body-container render-quiz' style={{ backgroundColor: `${Quiz.color}1f`}}>
            {submitted && <div className='submit-page'>
                <div className='submit-details-container' style={{ borderColor: `${Quiz.color}`}}>
                    <span className='submit-heading'>Thanks for attending the Quiz</span>
                    {Quiz.submissionRemark ? <span className='submit-remark'>{Quiz.submissionRemark}</span>: <span className='submit-remark'>Your Response has been Recorded</span>}
                    {Quiz.settings && Quiz.settings.releaseScore && <span><span className='submit-total-score'>You got {score}/{totalPoints()}</span> {Quiz.settings.showCorrectAnswers && <Button style={{fontSize: '1.2rem'}} size='small' color='primary' onClick={() => setCorrectAnswers(!correctAnswers)}>View Correct Answers</Button>}</span>}
                </div>
                {correctAnswers && <div className='correct-answers-container'>
                    {renderCorrectAnswers(questions, props.answers, correctAnswersArray)}
                </div>}
            </div>}
            {!submitted && <form id="myForm" className='event-container' onSubmit={props.handleSubmit(onFormSubmit)} >
            <div className='event-container__left' >
                <div className='quiz-header'>
                    <span className='quiz-title' style={{ color: `${Quiz.color}`}}>
                        {Quiz.formTitle}
                    </span>
                    <span className='quiz-description'>
                        {Quiz.formDescription}
                    </span>
                </div>
                <div className={`quiz-questions ${questions.length > 10 ? (questions.length > 25 ? 'very-long-quiz' : 'long-quiz') : 'short-quiz'}`}>
                    {RenderQuestionTag()}
                </div>
                <div className='quiz-footer'>
                    { start && <ColorButton variant="contained" style={{fontSize: '1.4rem'}} size='large' type="submit">Submit</ColorButton>}
                </div>
            </div>
            <div className='event-container__right' >
                {!start && <div className='instructions-container'>
                    <span className='instructions-container__title' style={{ color: `${Quiz.color}`}} >Instructions</span>
                    <ul>
                        {Quiz.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ul>
                    <ColorButton size='medium' variant='contained' color='primary' style={{ marginTop: '2rem', fontSize: '1.4rem'}} onClick={() => {setStart(true)}}>Start Quiz</ColorButton>
                </div>}
                {start && <>
                {questions[currentQuestion].time && questionLoading && <div className={`timer-container ${timerClass}`} style={{ borderColor: `${Quiz.color}`}}>
                    {renderTimer()}
                </div>}
                <div className='question-container' style={{ borderColor: `${Quiz.color}`}}>
                    <span className='question-container__question'>{questions[currentQuestion].question}{questions[currentQuestion].required && <span>*</span>}</span>
                    <span className='question-container__points'>{questions[currentQuestion].points} Points</span>
                    
                </div>
                <div className='answer-container' style={{ borderColor: `${Quiz.color}`}}>
                    
                        {<RenderAnswerContainer questions={questions} currentQuestion={currentQuestion} onClearClick={onClearClick} autofill={props.autofill}/>}
                    
                </div>
                <div className='nav-container'>
                    <button className='btn prev-btn' style={previousCursor === 'not-allowed' ? { cursor: `${previousCursor}`, backgroundColor: 'rgb(235, 235, 235)', color: `${Quiz.color}`}: { cursor: `${previousCursor}`, backgroundColor: 'rgb(255, 255, 255)', color: `${Quiz.color}`}} onClick={(e) => {e.preventDefault(); if(currentQuestion> 0 && !Quiz.questions[currentQuestion-1].time) if(currentQuestion > 0)setCurrrentQuestion(currentQuestion -1)}}>Previous</button>
                    <button className='btn left-btn' style={nextCursor === 'not-allowed' ? { cursor: `${nextCursor}`, backgroundColor: 'rgb(235, 235, 235)', color: `${Quiz.color}`}: { cursor: `${nextCursor}`, backgroundColor: 'rgb(255, 255, 255)', color: `${Quiz.color}`}} onClick={(e) => {e.preventDefault(); if(currentQuestion < Quiz.questions.length -1)setCurrrentQuestion(currentQuestion +1)}}>Next</button>
                </div>
                </>}
            </div>
            </form>}
        </div>}
        </>
    )
}
const selector = formValueSelector('quizResponse')

const mapStateToProps = (state) =>{
    const answers = selector(state, 'answers')
    return{
        answers
    }
}

export default connect(mapStateToProps, { clearFields, autofill })(reduxForm({ form: 'quizResponse'})(RenderQuiz));
