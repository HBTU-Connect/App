import React, { useState, useEffect } from 'react'
import { Field, FieldArray, reduxForm, formValueSelector, clearFields, autofill, registerField } from 'redux-form'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
// import {   } from '@material-ui/styles'
import { green } from '@material-ui/core/colors';
import { Button, IconButton, TextField, RadioGroup, Radio, FormControlLabel, FormControl, Checkbox, Switch } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { 
    Delete as DeleteIcon, 
    AddCircleOutline as AddCircleOutlineIcon, 
    Clear as ClearIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon, 
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    Timer as TimerIcon, 
    TimerOff as TimerOffIcon, 
    QuestionAnswer as QuestionAnswerIcon, 
    FormatListNumberedRounded as FormatListNumberedRoundedIcon,
    Settings as SettingsIcon, 
    Description as DescriptionIcon,
    Palette as PaletteIcon,
    InsertPhoto as InsertPhotoIcon,
    Subject as SubjectIcon,
    FilterNone as FilterNoneIcon,
    FileCopy as FileCopyIcon,
    YouTube as YouTubeIcon
} from '@material-ui/icons'


const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const RenderQuestion =({ fields, questions, userSettings, clearFields, autofill, handleChange, meta: { error, submitFailed } }) => {
        const [ customTime, setCustomTime ] = useState(false)
        const [ questionNumber, setQuestionNumber ] = useState(false)
        const [ addAnswers, setAddAnswers ] = useState(true)
        const [ addRules, setAddRules ] = useState(false)
        const [ quiz, setQuiz ] = useState(false)
        const [ activeQuestion , setActiveQuestion ] = useState(0)
        const [ activeClass, setActiveClass ] = useState([])

        useEffect(() => {
            if(userSettings){
                setQuiz(userSettings.quiz) 
            }
        },[userSettings]) 

        useEffect(() => {
            let newActiveClass = []
            newActiveClass[activeQuestion] = 'active'
            setActiveClass(newActiveClass)
            console.log(activeQuestion)
        }, [activeQuestion])
    
        useEffect(() => {
            
            if(!quiz && questions){
                questions.forEach((item, index) =>{
                    clearFields('createForm', false, false, `questions[${index}].answer`)
                })
            }
            // eslint-disable-next-line
        }, [quiz])       

        const copyCustomTime = () => {
            if(questions && questions[activeQuestion].time ){
                const value = questions[activeQuestion].time
                questions.forEach((item, index) =>{
                    if(!questions[index].time){
                        autofill(`questions[${index}].time`, value)
                    }
                })
            }
        }
    
        return(
        <>
        
            {submitFailed && error && <span>{error}</span>}
            {addRules && <div className='question-container__instructions'>
                    <span>Instructions</span>
                    <FieldArray name={`instructions`} component={renderInstructions}  />
                </div>}
        {fields.map((question, index) => (
            <div className={`question-container__question ${activeClass[index]}`} id={index} key={index} onClick={(event) => {setActiveQuestion(index) ;  }}>
                <div className='question-container__question-titlerow'>
                    { questionNumber && <div className='list-element-count' style={{ marginRight: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.5rem', width: '6rem', fontFamily: 'inherit'}}>{`Q . ${index +1}`}</div>}
                    <Field 
                        className={`textarea question-textarea`}
                        name={`${question}.question`}
                        component={renderTextArea}
                        label="Question" 
                        onChange={handleChange}
                    />
                    <Field
                        name={`${question}.type`}
                        component='select'
                    >
                        <option value=''>Select Type</option>
                        <option value='Multiple Choice'>Multiple Choice</option>
                        <option value='Long Answer'>Long Answer</option>
                        <option value='Short Answer'>Short Answer</option>
                        <option value='Multiple Select'>Multiple Select</option>
                        <option value='Drop-down'>Drop-down</option>
                        <option value='Integer Type'>Integer Type</option>
                    </Field>
                </div>
                {questions && (questions[index].type === 'Multiple Choice' || questions[index].type ==='Multiple Select' || questions[index].type ==='Drop-down') && <FieldArray name={`${question}.options`} questions={questions} questionIndex={index} component={renderOptions} />}
                {questions && questions[index].type === 'Long Answer' && <Field className='disabled-textarea' name={`${question}.response`} disabled={true} label='Long Answer Text' component={renderTextArea} />}
                {questions && questions[index].type === 'Short Answer' && <Field className='disabled-input' name={`${question}.response`} disabled={true} label='Short Answer Text' component={renderField} />}
                {questions && questions[index].type === 'Integer Type' && <Field className='disabled-input integer' name={`${question}.response`} disabled={true} label='Integer' component={renderField} />}
                <div className='divider-line'></div>
                {questions && userSettings && userSettings.quiz && addAnswers  && <>
                    <div className='question-answer'>
                        <div className='question-answer__title-row'>
                            <span className='question-answer__title'>Answer</span>
                            <div>
                                <Field name={`${question}.points`} component={renderField} type='number' className='questions-points' />
                                <span>Points</span>
                            </div>
                        </div>
                        { (questions[index].type === 'Multiple Choice' || questions[index].type ==='Drop-down') && questions[index].options && 
                            <Field name={`${question}.answer`} component={radioButton} options={questions[index].options} questionIndex={index}/>}
                        { (questions[index].type ==='Multiple Select' ) && questions[index].options && 
                            <FieldArray name={`${question}.answer`} component={checkboxButton} options={questions[index].options} questionIndex={index} />}
                        { (questions[index].type ==='Short Answer' ) && 
                            <FieldArray name={`${question}.answer`} component={renderShortAnswer} questionIndex={index} />}
                        { (questions[index].type ==='Integer Type' ) && 
                            <Field name={`${question}.answer`} component={renderField} type='number' max='10' min='1' className='questions-answer__input' />}
                        { (questions[index].type ==='Long Answer' ) && 
                            <span style={{ fontSize: '1.4rem'}}> You have to check long answers manually</span>}
                        
                    </div>
                    <div className='divider-line'></div>
                </>}
                <div className='question-footer'>
                    {customTime && <div className='time-input-container'>
                    <span>Time : </span>
                    <Field type='time' className='custom-time' name={`${question}.time`}  component={renderTextField} inputProps={{step: 10,style:{ fontSize: '1.3rem'}}} />
                    <IconButton size='medium' title='Copy this Time to all Questions' onClick={() => copyCustomTime()} style={{ width: '36.5px', marginLeft: '1rem'}}>
                        <FilterNoneIcon fontSize='small' />
                    </IconButton>
                    </div>}
                    <div className='required-container' ><span>Required</span> <Field name={`${question}.required`} component={renderSwitch} /></div>
                    <IconButton size='medium' title='Duplicate Question' onClick={() => { fields.insert( index+1, questions[index])}}>
                        <FileCopyIcon fontSize='large' />
                    </IconButton>
                    <IconButton size='medium' title='Add Video Link' >
                        <YouTubeIcon fontSize='large' />
                    </IconButton>
                    <IconButton size='medium' title='Add Image' >
                        <InsertPhotoIcon fontSize='large' />
                    </IconButton>
                    <IconButton
                        // className='btn-remove'
                        type="button"
                        title="Remove Question"
                        onClick={() => {setActiveQuestion(index); fields.remove(index); }}
                    >
                        <DeleteIcon fontSize='large'/>
                    </IconButton>
                    
                </div>
            </div>
        ))}
        {/* </div> */}
        <div className='menu-items-container'>
            <IconButton size='medium' style={{minWidth: 'unset'}} className='btn__add-question' title='Add Question' type="button" onClick={() => {fields.push({}); setActiveQuestion(fields.length); setTimeout(() => { document.getElementsByClassName('question-textarea')[fields.length].focus()}, 50) }}>
                <AddCircleOutlineIcon fontSize='large' />
            </IconButton>
            <IconButton size='medium' title='Add Instructions/Rules' onClick={() => {setAddRules( !addRules)}}>
                <SubjectIcon fontSize='large' />
            </IconButton>
            <IconButton size='medium' title='Add Custom Time for Question' onClick={() => {setCustomTime( !customTime); }}>
                {!customTime ? <TimerIcon fontSize='large' />: <TimerOffIcon  fontSize='large' />}
            </IconButton>
            {userSettings && userSettings.quiz && <IconButton size='medium' title='Add Answers' onClick={() => setAddAnswers(!addAnswers)} >
                <QuestionAnswerIcon fontSize='large' />
            </IconButton>}
            <IconButton size='medium' title='Display Question Numbers' onClick={() => {setQuestionNumber( !questionNumber)}}>
                <FormatListNumberedRoundedIcon fontSize='large' />
            </IconButton>
            

            
            
        
        {/* <div className='question-container__question'> */}
        </div>
        </>
    )}

const renderOptions = ({ fields, questions, questionIndex, meta: { error } }) => (
    <ul>
        {fields.map((option, index) => (
        <li key={index}>
            {questions && questions[questionIndex].type === 'Multiple Choice' && <RadioButtonUncheckedIcon style={{ marginRight: '2rem'}}/>}
            {questions && questions[questionIndex].type === 'Multiple Select' && <CheckBoxOutlineBlankIcon style={{ marginRight: '2rem'}}/>}
            {questions && questions[questionIndex].type === 'Drop-down' && <span className='list-element-count' style={{ marginRight: '2rem'}}>{index + 1}.</span>}
            <Field
            className={`question${questionIndex}options`}
            name={option}
            type="select"
            component={renderField}
            label={`Option ${index + 1}`} 
            defaultValue ={`Option ${index}`}
            />
            <IconButton 
            className='option-remove-btn' 
            size='small'
            type="button"
            title="Remove option"
            onClick={() => fields.remove(index)}
            ><ClearIcon fontSize='large' /></IconButton>
        </li>
        ))}
        {error && <li className="error">{error}</li>}
        <li>
            {questions && questions[questionIndex].type === 'Multiple Choice' && <RadioButtonUncheckedIcon className='button-icon' style={{ marginRight: '2rem'}}/>}
            {questions && questions[questionIndex].type === 'Multiple Select' && <CheckBoxOutlineBlankIcon className='button-icon' style={{ marginRight: '2rem'}}/>}
            {questions && questions[questionIndex].type === 'Drop-down' && <span className='list-element-count' style={{ marginRight: '2rem'}}>{fields.length + 1}.</span>}
            <button className='btn-add-option' type="button" onClick={() => {fields.push(); setTimeout(() => { document.getElementsByClassName(`question${questionIndex}options`)[fields.length].focus() }, 50)  }}>
                Add Option
            </button>
        </li>
    </ul>
)

const renderShortAnswer = ({ fields, questionIndex, meta: { error } }) => (
    <ul>
        {fields.map((option, index) => (
        <li key={index}>    
            <Field
            className={`question${questionIndex}-answer`}
            name={option}
            type="select"
            component={renderField}
            label={`Answer ${index + 1}`} 
            // defaultValue ={`Option ${index}`}
            />
            <IconButton 
            className='option-remove-btn' 
            size='small'
            type="button"
            title="Remove option"
            onClick={() => fields.remove(index)}
            ><ClearIcon fontSize='large' /></IconButton>
        </li>
        ))}
        {error && <li className="error">{error}</li>}
        <li>
            <button className='btn-add-option' type="button" onClick={() => {fields.push(); setTimeout(() => { document.getElementsByClassName(`question${questionIndex}-answer`)[fields.length].focus() }, 50)  }}>
                Add Answer
            </button>
        </li>
    </ul>
)

const renderInstructions = ({ fields, meta: { error } }) => (
    <ul>
        {fields.map((option, index) => (
        <li key={index}> 
        <span>{index +1} .</span>   
            <Field
            className={`instructions`}
            name={option}
            type="select"
            component={renderTextField}
            label={`Instruction ${index + 1}`} 
            // defaultValue ={`Option ${index}`}
            InputProps={{ style: { fontSize: '1.5rem' } }}  
            multiline 
            rowsMax="5" 
            />
            <IconButton 
            // className='option-remove-btn' 
            size='small'
            type="button"
            title="Remove option"
            onClick={() => fields.remove(index)}
            ><ClearIcon fontSize='large' /></IconButton>
        </li>
        ))}
        {error && <li className="error">{error}</li>}
        <li>
            <span>{fields.length +1}</span>
            <button className='btn-add-option' type="button" onClick={() => {fields.push(); setTimeout(() => { document.getElementsByClassName(`instructions`)[fields.length].focus() }, 50)  }}>
        
                Add Instructions
            </button>
        </li>
    </ul>
)

const renderField = ({ input, label, style, type, className, step, disabled, meta: { touched, error } }) => (
    <>
        <input className={className} style={style} step={step} {...input} disabled={disabled} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
    </>
    )

const renderTextField = ({input, set, value, label, step, className, defaultValue, ...custom}) => {
    return(
        <>
        <TextField 
            autoFocus
            {...input} 
            id={label}
            placeholder={label}
            className={className}
            InputLabelProps={{
            shrink: true,
            }}
            {...custom}
            // onChange={(value) => { set(value)}}
            
        />
        </>
    )
}

const radioButton = ({ input, options, questionIndex, ...rest}) => {
    return(
        <FormControl>
            <RadioGroup {...input} {...rest}>
                {options.map((option, index) => {
                    return <FormControlLabel key={index+1} id={`question${questionIndex}option${index+1}`} value={option} control={<Radio />} label={option} onClick={(event) => {if(document.getElementsByClassName('active-multiple-option')[parseInt(event.currentTarget.id.split('n')[1])]){document.getElementsByClassName('active-multiple-option')[parseInt(event.currentTarget.id.split('n')[1])].className = document.getElementsByClassName('active-multiple-option')[parseInt(event.currentTarget.id.split('n')[1])].className.replace(" active-multiple-option", "");} document.getElementById(`${event.currentTarget.id}`).classList.add('active-multiple-option'); }}/>
                })}
            </RadioGroup>
        </FormControl>
    )
}

const renderCheckBox = ({ input, index, option, questionIndex }) => {
    // setTimeout(() => {document.getElementById('checkbox').addEventListener('change', activeOption(index))}, 1000) 
    return <FormControlLabel   key={index+1} id={`question${questionIndex}option${index+1}`}  control={<GreenCheckbox id={`checkbox ${index} question ${questionIndex}`} {...input} onChange={(event) => { activeOption(event)}}/>} label={option} />     
}

const activeOption = (event) => {
    // event.preventDefault()
    const index = parseInt(event.currentTarget.id.split(' ')[1])
    const questionIndex = parseInt(event.currentTarget.id.split(' ')[3])
    if(document.getElementById(`question${questionIndex}option${index+1}`).classList.contains('active-option')){
        document.getElementById(`question${questionIndex}option${index+1}`).className = document.getElementById(`question${questionIndex}option${index+1}`).className.replace(" active-option", "")
        // document.getElementById('checkbox').checked = true;
         
    } else {
        document.getElementById(`question${questionIndex}option${index+1}`).classList.add('active-option')
        // document.getElementById('checkbox').checked = false;
    }

}


const checkboxButton = ({ fields, options, questionIndex, meta: { touched } }) => {
    return(
            options.map( (option, index) => (
                <Field key={index} component={renderCheckBox} name={`questions[${questionIndex}].answer[${index}]`} option={option} index={index} questionIndex={questionIndex} />
            ))
    )
}


const renderTextArea = ({ input, label, style, className, disabled, meta: { touched, error } }) => (
<>
    <textarea className={`textarea ${className}`} style={style} disabled={disabled} rows='1' {...input} placeholder={label} />
    {touched && error && <span>{error}</span>}
</>
)


const renderSwitch = ({ input, disabled}) => (
    <Switch
        {...input}
        color="primary"
        checked={ input.value ? true : false}
        disabled={disabled}
      />
)
const renderQuizSwitch = ({ input, disabled, quiz }) => (
    <Switch
        {...input}
        color="primary"
        checked={quiz && input.value ? true : false}
        disabled={disabled}
      />
)

const renderDateTimePicker = ({ input, date, setDate }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker inputProps={{ style: { fontSize: '1.4rem'}}} {...input} value={date} onChange={setDate}/>
    </MuiPickersUtilsProvider>
)

const RenderSettings = ({userSettings, clearFields, schedule, autofill }) => {
    const [ quiz, setQuiz ] = useState(false)
    const [ date, setDate ] = useState('')


    useEffect(()=> {
        if(schedule){
            setDate(schedule)
        }
    }, [])

    useEffect(()=> {
        
        if(date){
            console.log(date.getTime())
            autofill('schedule', date)
        }
    }, [date])

    useEffect(() => {
        if(userSettings){
            setQuiz(userSettings.quiz) 
            if(!userSettings.schedule){
                console.log('date')
                setDate('')
            }
            if(!userSettings.quiz){
                console.log('date')
                setDate('')
            }
            
            
        }
        // eslint-disable-next-line
    },[userSettings]) 

    useEffect(() => {
        if(userSettings && !userSettings.quiz){
            console.log('clear')
            clearFields('createForm', false, false, 'schedule', 'settings.schedule', 'settings.releaseScore', 'settings.showCorrectAnswers', 'quizTime', 'settings.quizTime')
        }
        // eslint-disable-next-line
    }, [quiz])

    return(
        <div className='form-settings__settings'>
        <div className='form-settings__setting'>
            <div className='form-settings__setting-title'>
                <span className='setting-title'> Make This a Quiz</span>
                {/* <span className='setting-helper-text'>Not a Quiz</span> */}
            </div>
            <div className='form-settings__setting-switch'>
                <Field name='settings.quiz' component={renderSwitch}  />
            </div>
        </div>
        <div className='form-settings__setting'>
            <div className='form-settings__setting-title'>
                <span className='setting-title'>Release Score</span>
                <span className='setting-helper-text'>{userSettings && userSettings.releaseScore ? 'Immediately after each Submittion': 'Later after Manual Correction'}</span>
            </div>
            <div className='form-settings__setting-switch'>
                <Field name='settings.releaseScore' component={renderQuizSwitch} disabled={!quiz} quiz={quiz}/>
            </div>
        </div>
        <div className='form-settings__setting'>
            <div className='form-settings__setting-title'>
                <span className='setting-title'>Show Correct Answers</span>
                <span className='setting-helper-text'>{userSettings && userSettings.showCorrectAnswers ? 'Show Correct Answers along with the Score': "Don't Show Correct Answers"}</span>
            </div>
            <div className='form-settings__setting-switch'>
                <Field name='settings.showCorrectAnswers' component={renderQuizSwitch} disabled={!quiz} quiz={quiz}/>
            </div>
        </div>
        <div className='form-settings__setting'>
            <div className='form-settings__setting-title'>
                <span className='setting-title'>Set Quiz Time</span>
                <span className='setting-helper-text'>{userSettings && userSettings.quizTime ? 'Quiz will be available for the selected time after user starts the quiz': 'Add Time limit to attend the Quiz'}</span>
            </div>
            <div className='form-settings__setting-switch'>
                <Field name='settings.quizTime' component={renderQuizSwitch} disabled={!quiz} quiz={quiz} />
            </div>
        </div>
        {userSettings && userSettings.quizTime && <div>
            <Field name='quizTime' component={renderTextField} type='time' inputProps={{step: 10,style:{ fontSize: '1.3rem'}}}/>
            </div>}
        <div className='form-settings__setting'>
            <div className='form-settings__setting-title'>
                <span className='setting-title'> Schedule Quiz</span>
                <span className='setting-helper-text'>{userSettings && userSettings.schedule ? (date? `Quiz will be live on ${date}`: 'Please Select a Date and Time'): 'Add Date and Time to start the Quiz'}</span>
            </div>
            <div className='form-settings__setting-switch'>
                <Field name='settings.schedule' component={renderQuizSwitch} disabled={!quiz} quiz={quiz} />
            </div>
        </div>
        {userSettings && userSettings.schedule && !date  && <div>
            <Field name='schedule' component={renderDateTimePicker} date={date} setDate={setDate} value={date}/>
          </div> }
        <div className='form-settings__setting'>
            <div className='form-settings__setting-title'>
                <span className='setting-title'>Suffle Questions Order</span>
                <span className='setting-helper-text'>{userSettings && userSettings.suffle ? 'Questions will be Suffled': 'This will suffle the question order for each attendee'}</span>
            </div>
            <div className='form-settings__setting-switch'>
                <Field name='settings.suffle' component={renderSwitch}  />
            </div>
        </div>
        <div className='form-settings__setting'>
            <div className='form-settings__setting-title'>
                <span className='setting-title'>Allow Club Members only</span>
                <span className='setting-helper-text'>{userSettings && userSettings.clubMembersOnly ? `Only Club Members Can attend the ${userSettings && userSettings.quiz ? 'Quiz': 'Form'}`: `Allow Only Club Members to attend the ${userSettings && userSettings.quiz ? 'Quiz': 'Form'}`}</span>
            </div>
            <div className='form-settings__setting-switch'>
                <Field name='settings.clubMembersOnly' component={renderSwitch}  />
            </div>
        </div>
        <div className='form-settings__setting'>
            <div className='form-settings__setting-title'>
                <span className='setting-title'>Allow Edit Response</span>
                <span className='setting-helper-text'>{userSettings && userSettings.editResponse ? 'Users can edit their Response': 'Allow Users to edit their Response'}</span>
            </div>
            <div className='form-settings__setting-switch'>
                <Field name='settings.editResponse' component={renderSwitch}  />
            </div>
        </div>
        <div className='form-settings__setting'>
            <div className='form-settings__setting-title'>
                <span className='setting-title'>Add Submission Remark</span>
                <span className='setting-helper-text'>{userSettings && userSettings.submissionRemark ? 'Please enter the Remark': 'Add a Remark you want show after Submission of Form'}</span>
            </div>
            <div className='form-settings__setting-switch'>
                <Field name='settings.submissionRemark' component={renderSwitch}  />
            </div>
        </div>
        {userSettings && userSettings.submissionRemark && <div>
                <Field name='submissionRemark' component={renderTextField} multiline inputProps={{ style: { width: '100%'}}} label='Add Remark'/>
            </div>}
        
    </div>
    )
}



class CreateQuiz extends React.Component{
    state={
        rows: 1,
        minRows: 1,
        maxRows: 10,
        addQuizTime: false,
        class: 0,
        description: false,
        colorIndex: 0,
        settings: false
        }

    colors = [ '#673ab7', '#db4437', '#3f51b5', '#4285f4', '#03a9f4', '#00bcd4', '#ff5722', '#ff9800', '#009688', '#4caf50', '#607d8b', '#9e9e9e']
    

    handleChange = (event) => {
		const textareaLineHeight = 18;
		const { minRows, maxRows } = this.state;
		
  	    event.target.rows = minRows; // reset number of rows in textarea 
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
        event.target.rows = currentRows;
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
    
        this.setState({
            value: event.target.value,
            rows: currentRows < maxRows ? currentRows : maxRows,
        });
    };

    onFormSubmit = (formValues) => {
        // event.preventDefault()
        if(formValues.questions){
            formValues.questions.map((question, index) => {
                if(question.type === 'Multiple Select'){
                    question.options.map((option, index) => {
                        if(!question.answer[index]){
                            question.answer[index] = false
                        }
                    })
                }
            })
        }
        console.log(formValues)
    }

    onSettingClick = () => {
        this.setState({ settings: !this.state.settings})
    }

    render(){
        return(
            <div className='body-container create-quiz'>
            <div className='form-container-quiz' style={{ backgroundColor: `${this.colors[this.state.colorIndex]}1f`}}>
            <div className='form-container__quiz' style={{ backgroundColor: `${this.colors[this.state.colorIndex]}`, borderColor: `${this.colors[this.state.colorIndex]}`}}>
                <form onSubmit={this.props.handleSubmit(this.onFormSubmit)} >
                    <div className='form-header'>
                        <div className='form-menu'>
                            <IconButton size='medium' title='Change Form Color' aria-controls="simple-menu" aria-haspopup="true" onClick={() => { if(this.state.colorIndex < this.colors.length -1){ this.setState({ colorIndex: this.state.colorIndex +1 }) } else{this.setState({ colorIndex: 0})}  } }>
                                <PaletteIcon fontSize='large'/>
                            </IconButton>
                            <IconButton size='medium' title='Add Description' aria-controls="simple-menu" aria-haspopup="true" onClick={() => {this.setState({description: !this.state.description}); setTimeout(() => { if(document.getElementsByClassName('form-description')[0]){document.getElementsByClassName('form-description')[0].focus()}}, 50) }}>
                                <DescriptionIcon fontSize='large'/>
                            </IconButton>
                            <IconButton style={{ marginRight: '1rem'}} title='Settings' size='medium' aria-controls="simple-menu" aria-haspopup="true" onClick={this.onSettingClick}>
                                <SettingsIcon fontSize='large'/>
                            </IconButton>
                            <Button size='medium' variant='contained' color='primary' className='btn-submit' type='submit'>Submit</Button>
                            
                        </div>
                        <Field type='text' name='formTitle' className='form-title' style={{ borderColor: `${this.colors[this.state.colorIndex]}` }} component={renderField} label='Form Title' />
                        { this.state.description && <Field name='formDescription' className='form-description' component={renderTextArea}  style={{ borderColor: `${this.colors[this.state.colorIndex]}` }} label='Form Description' onChange={this.handleChange}/>}
                        {this.state.settings && <div className='form-settings-container' onClick={() => { this.setState({ settings: false })}}> <div className='form-settings' style={{ borderColor: `${this.colors[this.state.colorIndex]}` }} onClick={(e) => {e.stopPropagation()}}>
                            <div className = 'form-settings__title' style={{ color: `${this.colors[this.state.colorIndex]}` }}><span style={{ marginRight: 'auto', display: 'flex', alignItems: 'center'}}>Settings <SettingsIcon style={{ paddingLeft: '1rem', fontSize: '3.5rem'}} fontSize='large'/></span><Button size='medium' variant='contained' color='primary' style={{fontSize: '1.3rem'}} onClick={() => { this.setState({ settings: !this.state.settings })}}>Done</Button></div>
                            {<RenderSettings userSettings={this.props.settings} clearFields={this.props.clearFields} schedule={this.props.schedule} autofill={this.props.autofill} />}
                            </div></div>}
                    </div>
                    <div className='question-container'>
                        
                        <FieldArray name='questions' questions={this.props.questions} handleChange={this.handleChange} userSettings={this.props.settings} clearFields={this.props.clearFields} autofill={this.props.autofill} registerField={this.props.registerField} component={RenderQuestion} />
                    </div>
                    
                </form>
                <div></div>
            </div>
            </div>
            </div>
        )
    }
}

CreateQuiz =  reduxForm({
    form: 'createForm'
  })(CreateQuiz)

const selector = formValueSelector('createForm')
export default connect(state => {
    const questions = selector(state, 'questions')
    const settings = selector(state, 'settings')
    const schedule = selector(state, 'schedule')
    return{
        questions,
        settings,
        schedule
    }
}, {
    clearFields, 
    autofill,
    registerField
})(CreateQuiz)