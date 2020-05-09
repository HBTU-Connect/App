import React, { useState } from 'react'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button, IconButton, TextField, RadioGroup, Radio, FormControlLabel, FormControl, Checkbox } from '@material-ui/core';
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
    QueryBuilder as QueryBuilderIcon,
    Event as EventIcon,
    Settings as SettingsIcon, 
    Description as DescriptionIcon,
    Palette as PaletteIcon,
    InsertPhoto as InsertPhotoIcon
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

  const RenderQuestion =({ fields, questions, handleChange, meta: { error, submitFailed } }) => {
        const [ customTime, setCustomTime ] = useState(false)
        const [ questionNumber, setQuestionNumber ] = useState(false)
        const [ addAnswers, setAddAnswers ] = useState(false)

        return(
        <>
        
            {submitFailed && error && <span>{error}</span>}
        
        {fields.map((question, index) => (
            <div className={`question-container__question`} id={index} key={index} onClick={(event) => {if(document.getElementsByClassName('active')[0]){document.getElementsByClassName('active')[0].className = document.getElementsByClassName('active')[0].className.replace(" active", "");} document.getElementById(`${event.currentTarget.id}`).classList.add('active'); }}>
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
                        <option>Select Type</option>
                        <option>Multiple Choice</option>
                        <option>Long Answer</option>
                        <option>Short Answer</option>
                        <option>Multiple Select</option>
                        <option>Drop-down</option>
                        <option>Integer Type</option>
                    </Field>
                </div>
                {questions && (questions[index].type === 'Multiple Choice' || questions[index].type ==='Multiple Select' || questions[index].type ==='Drop-down') && <FieldArray name={`${question}.options`} questions={questions} questionIndex={index} component={renderOptions} />}
                {questions && questions[index].type === 'Long Answer' && <Field className='disabled-textarea' name={`${question}.response`} disabled={true} label='Long Answer Text' component={renderTextArea} />}
                {questions && questions[index].type === 'Short Answer' && <Field className='disabled-input' name={`${question}.response`} disabled={true} label='Short Answer Text' component={renderField} />}
                {questions && questions[index].type === 'Integer Type' && <Field className='disabled-input integer' name={`${question}.response`} disabled={true} label='Integer' component={renderField} />}
                <div className='divider-line'></div>
                {questions && addAnswers  && <>
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
                    {customTime ? <div className='time-input-container'>
                    <span>Time : </span>
                    <Field type='time' className='custom-time' name={`${question}.time`}  component={renderTextField} step='10' />
                    </div>: null}
                    <IconButton size='large' title='Add Image' >
                        <InsertPhotoIcon fontSize='large' />
                    </IconButton>
                    <IconButton
                        // className='btn-remove'
                        type="button"
                        title="Remove Question"
                        onClick={() => fields.remove(index)}
                    >
                        <DeleteIcon fontSize='large'/>
                    </IconButton>
                    
                </div>
            </div>
        ))}
        {/* </div> */}
        <div className='menu-items-container'>
            <IconButton size='large' style={{minWidth: 'unset'}} className='btn__add-question' title='Add Question' type="button" onClick={() => {fields.push({}); setTimeout(() => {if(document.getElementsByClassName('active')[0]){document.getElementsByClassName('active')[0].className = document.getElementsByClassName('active')[0].className.replace(" active", "");} document.getElementById(`${fields.length}`).classList.add('active'); document.getElementsByClassName('question-textarea')[fields.length].focus()}, 50) }}>
                <AddCircleOutlineIcon fontSize='large' />
            </IconButton>
            <IconButton size='large' title='Add/Remove Custom Time for Question' onClick={() => {setCustomTime( !customTime); }}>
                {!customTime ? <TimerIcon fontSize='large' />: <TimerOffIcon  fontSize='large' />}
            </IconButton>
            <IconButton size='large' title='Add Answers' onClick={() => setAddAnswers(!addAnswers)} >
                <QuestionAnswerIcon fontSize='large' />
            </IconButton>
            <IconButton size='large' title='Display Question Numbers' onClick={() => {setQuestionNumber( !questionNumber)}}>
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

const renderField = ({ input, label, type, className, step, disabled, meta: { touched, error } }) => (
    <>
        <input className={className} step={step} {...input} disabled={disabled} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
    </>
    )

const renderTextField = ({input, set, value, label, step, className, defaultValue}) => {
    return(
        <>
        <TextField 
            {...input} 
            id="time"
            label={label}
            type="time"
            className={className}
            InputLabelProps={{
            shrink: true,
            }}
            inputProps={{
            step: step, // 5 min
            }}
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
                    return <FormControlLabel key={index+1} id={`question${questionIndex}option${index+1}`} value={option} control={<Radio />} label={option} onClick={(event) => {if(document.getElementsByClassName('active-multiple-option')[parseInt(event.currentTarget.id.split('n')[1])]){document.getElementsByClassName('active-multiple-option')[parseInt(event.currentTarget.id.split('n')[1])].className = document.getElementsByClassName('active-multiple-option')[parseInt(event.currentTarget.id.split('n')[1])].className.replace(" active-multiple-option", "");} document.getElementById(`${event.currentTarget.id}`).classList.add('active-multiple-option'); console.log(parseInt(event.currentTarget.id.split('n')[1])) }}/>
                })}
            </RadioGroup>
        </FormControl>
    )
}

const renderCheckBox = ({ input, index, option, questionIndex }) => {
    // setTimeout(() => {document.getElementById('checkbox').addEventListener('change', activeOption(index))}, 1000) 
    return <FormControlLabel   key={index+1} id={`question${questionIndex}option${index+1}`}  control={<GreenCheckbox id={`checkbox ${index} question ${questionIndex}`} {...input} onChange={(event) => {activeOption(event)}}/>} label={option} />     
}

const activeOption = (event) => {
    const index = parseInt(event.currentTarget.id.split(' ')[1])
    const questionIndex = parseInt(event.currentTarget.id.split(' ')[3])
    console.log(index)
    // event.preventDefault()
    if(document.getElementById(`question${questionIndex}option${index+1}`).classList.contains('active-option')){
        console.log(event)
        document.getElementById(`question${questionIndex}option${index+1}`).className = document.getElementById(`question${questionIndex}option${index+1}`).className.replace(" active-option", "")
        // document.getElementById('checkbox').checked = true;
         
    } else {
        document.getElementById(`question${questionIndex}option${index+1}`).classList.add('active-option')
        console.log(event) 
        // document.getElementById('checkbox').checked = false;
    }

}


const checkboxButton = ({ fields, options, questionIndex }) => {
    // if(fields.length !== options.length && options[options.length -1] !== undefined) options.map((option, index) => fields.insert(index, option))
    // console.log(fields)
    // console.log(options)
    return(
        // <FormControl  {...rest}>
            options.map((option, index) => {
                return <Field key={index} component={renderCheckBox} name={`questions[${questionIndex}].answer.${option}`} value={option} option={option} index={index} questionIndex={questionIndex} />
                })
        // </FormControl>
    )
}

const renderTextArea = ({ input, label, className, disabled, meta: { touched, error } }) => (
<>
    <textarea className={`textarea ${className}`} disabled={disabled} rows='1' {...input} placeholder={label} />
    {touched && error && <span>{error}</span>}
</>
)



class CreateQuiz extends React.Component{
    state={
        rows: 1,
        minRows: 1,
        maxRows: 10,
        addQuizTime: false,
        class: 0,
        description: false
    }

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
        console.log(formValues)
    }

    render(){
        return(
            <div className='form-container'>
                <form onSubmit={this.props.handleSubmit(this.onFormSubmit)} >
                    <div className='form-header'>
                    <div className='form-menu'>
                    <IconButton size='large' title='Add Description' aria-controls="simple-menu" aria-haspopup="true" onClick={() => this.setState({description: !this.state.description})}>
                            <PaletteIcon fontSize='large'/>
                        </IconButton>
                        <IconButton size='large' title='Add Description' aria-controls="simple-menu" aria-haspopup="true" onClick={() => this.setState({description: !this.state.description})}>
                            <DescriptionIcon fontSize='large'/>
                        </IconButton>
                        <IconButton size='large' title='Schedule Quiz' aria-controls="simple-menu" aria-haspopup="true" >
                            <EventIcon fontSize='large'/>
                        </IconButton>
                        <IconButton size='large' title='Add Time for Quiz' aria-controls="simple-menu" aria-haspopup="true" >
                            <QueryBuilderIcon fontSize='large'/>
                        </IconButton>
                        <IconButton style={{ marginRight: '1rem'}} title='Settings' size='large' aria-controls="simple-menu" aria-haspopup="true" >
                            <SettingsIcon fontSize='large'/>
                        </IconButton>
                        <Button size='large' variant='contained' color='primary' className='btn-submit' type='submit'>Submit</Button>
                        
                    </div>
                        <Field type='text' name='formTitle' component={renderField} label='Form Title' />
                        { this.state.description && <Field name='formDescription' component={renderTextArea} label='Form Description' onChange={this.handleChange}/>}
                    </div>
                    <div className='question-container'>
                        <FieldArray name='questions' questions={this.props.questions} handleChange={this.handleChange} component={RenderQuestion} />
                    </div>
                    
                </form>
                <div></div>
            </div>
        )
    }
}

CreateQuiz =  reduxForm({
    form: 'Form'
  })(CreateQuiz)

const selector = formValueSelector('Form')
export default connect(state => {
    const questions = selector(state, 'questions')
    return{
        questions
    }
})(CreateQuiz)