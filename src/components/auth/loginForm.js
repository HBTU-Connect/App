import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button, TextField, FormControl, InputAdornment, InputLabel, OutlinedInput, FormHelperText, Switch, IconButton, FormControlLabel } from '@material-ui/core'
import { Visibility, VisibilityOff, Lock, Person} from '@material-ui/icons'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { ChasingDotsSpinner } from '../utils/loadingSpinner'

// redux-utilities
import{ loginUser } from '../../store/user';

//images
import loginImage from '../../images/login1.png';

const theme = createMuiTheme({
    overrides: {
      // Style sheet name
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
            //   transform: 'translate(14px, 12px) scale(1)'
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
              right: '0px'
          },
          contained:{
              marginRight: '0px',
              marginLeft: '4px'
          }
      },
      MuiInputAdornment: {
          positionStart:{
            color: 'grey'
          }
      },
    },
  });

  const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'rgb(0, 88, 136)',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'rgb(0, 88, 136)',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: 'rgb(0, 88, 136)',
        },
      },
    },
  })(TextField);

  const CssOutlinedInput = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'rgb(0, 88, 136)',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'rgb(0, 88, 136)',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: 'rgb(0, 88, 136)',
        },
      },
    },
  })(OutlinedInput);

const ColorButton = withStyles((theme) => ({
root: {
    color: theme.palette.getContrastText('rgb(0, 88, 136)'),
    backgroundColor: 'rgb(0, 88, 136)',
    '&:hover': {
    backgroundColor: 'rgb(0, 88, 140)',
    },
},
}))(Button);

const LoginForm  = (props) => {
    const [ formValues, setFormValues ] = useState(initialValues)
    const [ formErrors, setFormErrors ] = useState({})
    const [ showPassword, setShowPassword ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ redirect, setRedirect ] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    // state = {
    //     typePassword: 'password'
    // }

    const dispatch = useDispatch();

    useEffect(() =>{
        if(!loading && props.authData && props.authData.type === 'login' && props.authData.data){
            enqueueSnackbar(props.authData.data.msg, {variant: 'success', autoHideDuration: 3000})
            setRedirect(true)
        }
        if(!loading && props.authData && props.authData.type === 'error' && props.authData.data){
            enqueueSnackbar(props.authData.data, {variant: 'error', autoHideDuration: 3000})

        }
        // eslint-disable-next-line
    }, [loading])


    const handleFieldChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if(formErrors[name])
        setFormErrors({...formErrors, [name]: ''})

        if(name === 'rememberMe'){    
            let rememberMe
            if(formValues.rememberMe) rememberMe= false
            else rememberMe=true
            setFormValues({...formValues, rememberMe})
        }
        else
        setFormValues({...formValues, [name]: value })
    }

    const handleSubmitClick = async () => {
        const errors = validate(formValues)
        setFormErrors(errors)
        if(Object.keys(errors).length === 0){
            setLoading(true)
            console.log(formValues)


            //add login action here

            dispatch(loginUser(formValues));
            setLoading(false)
            
        }
    }
    if(redirect){
        return(
            <Redirect to='/feeds' />
        )
    }

    return(
        <>
        <div className='login-form morning'>
            <div className='login-form-image'>
                    <img src={loginImage} alt='loginImage' />
                </div>
            <div className='heading-container'>
                <div className='heading-container-primary'>
                    HBTU Connect
                </div>
                <div className='heading-container-secondary'>
                    Welcome Back
                </div>
                <div className='heading-container-content'>
                    Get Connected with your Mates in just one click and Explore the world of 
                    HBTU Connect.
                    
                </div>
                <div className='heading-container-greeting'>
                    Have a Good Day !!
                </div>
                
            </div>
            <div className='login-form--container'>
                {loading && <div className='loader'>
                    <ChasingDotsSpinner />
                </div>}
                <div className='form-heading'>
                    Login
                    {/* <div className='divider'></div> */}
                    <span className='form-heading-secondary'>
                        Don't have account? <Link className='link' to='/joinus'>Join Now</Link>
                    </span>
                </div>
                    <ThemeProvider theme={theme}>
                        <div className='input-field__login user'>
                            <CssTextField 
                                variant='outlined' 
                                error={formErrors.username ? true: false} 
                                helperText={formErrors.username} 
                                name='username' 
                                label='User Name' 
                                type='text' 
                                value={formValues.username} 
                                onChange={(e) => handleFieldChange(e)} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person fontSize='large' />
                                        </InputAdornment>
                                    ),
                                    }}
                            />
                        </div>
                        <div className='input-field__login user'>
                            <FormControl variant="outlined" error={formErrors.password ? true: false}>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <CssOutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={formValues.password}
                                    onChange={(e) => handleFieldChange(e)}
                                    startAdornment={
                                        <InputAdornment position="start">
                                          <Lock fontSize='large' />
                                        </InputAdornment>
                                      }
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                        >
                                        {showPassword ? <Visibility fontSize='large' /> : <VisibilityOff  fontSize='large'/>}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={65}
                                />
                                <FormHelperText>{formErrors.password} </FormHelperText>
                            </FormControl>
                        </div>
                    </ThemeProvider>
                    <div className='input-field__login switch'>
                    <FormControlLabel
                        control={
                        <Switch
                            checked={formValues.rememberMe}
                            onChange={e => handleFieldChange(e)}
                            name="rememberMe"
                            color="primary"
                        />
                        }
                        label="Remember Me"
                    />
                    </div>
                    
                    <ColorButton onClick={handleSubmitClick}>Log in</ColorButton>
                    <Link className='password-reset-link' to='/resetpassword'>Forgot Password?</Link><br />
                    <Link className='password-reset-link' to='/help'>Help?</Link>
            </div>
        </div>
        </>
    );
}

const validate = values => {
    const errors = {}

    if( !values.username){
      errors.username='Required'
    }

    if( !values.password){
      errors.password='Required'
    }

    return errors
}

const initialValues = {
    username : '',
    password : '',
    rememberMe: false
}

// const mapStateToProps = (state) => {
//     return{
//         authData: state.authData
//     }
// }

export default LoginForm