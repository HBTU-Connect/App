import React, { useState, useEffect } from 'react';
import { Button, TextField, FormHelperText, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff} from '@material-ui/icons'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiFormControlLabel:{
          root:{
              fontSize: '1.4rem'
          },
          label:{
              lineHeight: '1.3',
              fontFamily: 'unset'
          }
      },
      MuiTextField:{
          root:{
            fontSize: '1.4rem'
          }
      },
      MuiInputBase: {
          input:{
              fontSize: '1.4rem',
              fontFamily: 'unset'
          },
          formControl:{
              fontSize: '1,4rem',
              fontFamily: 'unset'
          }

      },
      MuiFormLabel: {
        root:{
            fontSize: '1.4rem',
            fontFamily: 'unset'
        }
      },
      MuiInputLabel: {
          root:{
              fontSize: '1.4rem',
              fontFamily: 'unset'
          },
          outlined:{
              fontSize: '1.4rem',
              transform: 'translate(14px, 12px) scale(1)'
          }
      },
      MuiOutlinedInput: {
          root:{
              fontSize: '1.4rem'
          }
      },
      MuiFormHelperText: {
          root: {
              fontSize: '1rem',
              fontFamily: 'unset',
              lineHeight: '1.4',
              position: 'absolute',
              bottom: '-14px',
              left: '0px'
          },
          contained:{
              marginRight: '0px',
              marginLeft: '4px'
          }
      }
    },
  });



const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('rgb(0, 88, 136)'),
      backgroundColor: 'rgb(0, 88, 136)',
      '&:hover': {
        backgroundColor: 'rgb(0, 88, 140)',
      },
    },
  }))(Button);

const SignUpFormSecondPage = (props) => {
    const [ formValues, setFormValues ] = useState(initialValues)
    const [ formErrors, setFormErrors ] = useState({})
    const [ showPassword, setShowPassword ] = useState(false)
    const { onSubmit, previousPage } = props

    useEffect(()=> {
        setFormValues({...formValues, ...props.initialValues })
        // console.log(props.initialValues)
    }, [])

    const handleFieldChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if(formErrors[name])
        setFormErrors({...formErrors, [name]: ''})

        setFormValues({...formValues, [name]: value })
    }

    const handleSubmitClick =() => {
        const errors = validate(formValues)
        setFormErrors(errors)
        console.log(formValues)
        if(Object.keys(errors).length === 0){
            onSubmit(formValues)
        }
    }

    return (
        <div className='form-container__sign-up'>
            <div className='form-heading'>
                Create Account
                <div className='divider'></div>
            </div>
            <ThemeProvider theme={theme}>
            <div className='input-field__signup user'>
                <TextField margin='dense' variant='outlined' error={formErrors.username ? true: false} helperText={formErrors.username} name='username' label='User Name' type='text' value={formValues.username} onChange={(e) => handleFieldChange(e)} />
            </div>
            <div className='input-field__signup user'>
                <FormControl variant="outlined" error={formErrors.password ? true: false}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        margin='dense'
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={formValues.password}
                        onChange={(e) => handleFieldChange(e)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                            >
                            {showPassword ? <Visibility fontSize='inherit' /> : <VisibilityOff  fontSize='inherit'/>}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={65}
                    />
                    <FormHelperText>{formErrors.password} </FormHelperText>
                </FormControl>
            </div>
            <div className='input-field__signup user last'>
                <FormControl variant="outlined" error={formErrors.confirmPassword ? true: false}>
                    <InputLabel htmlFor="outlined-adornment--confirmpassword">Confirm Password</InputLabel>
                    <OutlinedInput
                        margin='dense'
                        id="outlined-adornment-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        value={formValues.confirmPassword}
                        onChange={(e) => handleFieldChange(e)}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                            >
                            {showPassword ? <Visibility fontSize='inherit' /> : <VisibilityOff fontSize='inherit' />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={120}
                    />
                    <FormHelperText>{formErrors.confirmPassword} </FormHelperText>
                </FormControl>
            </div>
                
                
                <div className='form-button'>
                    <Button variant='text' style={{ marginRight: 'auto'}} className="previous" onClick={previousPage}>
                        Previous
                    </Button>
                    <ColorButton variant='contained' onClick={handleSubmitClick}>
                        Submit
                    </ColorButton>
                </div>
                </ThemeProvider>
        </div>

    )
}

const validate = values => {
    const errors = {}

    if( !values.username){
      errors.username='Required'
    }else if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
      errors.username= 'Username is taken' 
    }else if(!/^[\w]+$/i.test(values.username)){
      errors.username='Username can only contain _ '
    }

    if( !values.password){
      errors.password='Required'
    }else if(!/(?=.*[a-z])/i.test(values.password)){
      errors.password='Password must contain an Alphabate'
    }else if( !/(?=.*[0-9])/i.test(values.password)){
      errors.password= 'Password Must contain a Number'
    }else if( !/(?=.[!@#$%^&])/i.test(values.password)){
      errors.password= 'Password Must contain a symbol'
    }else if( !/(?=.*[A-Z])/i.test(values.password)){
       errors.password= 'Password Must contain a capital letter'
     }else if(!/(?=.{8,})/i.test(values.password)){
       errors.password = 'Password Should be greater than 8 Characters'
     }

    if( values.confirmPassword !== values.password){
      errors.confirmPassword = 'Passwords do not Match'
    }

    return errors
}

const initialValues = {
    username : '',
    password : '',
    confirmPassword : ''
}

// export default reduxForm({
//   form: 'signup', //Form name is same
//   destroyOnUnmount: false,
//   forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
//   validate
// })(SignUpFormSecondPage)

export default SignUpFormSecondPage