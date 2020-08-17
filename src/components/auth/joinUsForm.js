import React, { useEffect, useState} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { ChasingDotsSpinner } from '../utils/loadingSpinner'
import { useSnackbar } from 'notistack';

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


const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('rgb(0, 88, 136)'),
      backgroundColor: 'rgb(0, 88, 136)',
      '&:hover': {
        backgroundColor: 'rgb(0, 88, 140)',
      },
    },
}))(Button);

const JoinUsForm  = (props) => {
    const [ loading, setLoading ] = useState(false)
    const [ value, setValue ] = useState('')
    const [ errors, setErrors ] = useState({})
    const { enqueueSnackbar } = useSnackbar();
    
    const onFormSubmit = () => {
        const errors = validate(value)
        setErrors({...errors})
        if(Object.keys(errors).length === 0){
            setLoading(true)
            console.log(value)


            //add login action here
            setLoading(false)
            
        }
    }


    // if( !loading){
    //     return <Redirect to='/signup' />
    // }

    return(
        <>

        <div className='signup-form-container'>     
            <div className='form-container__joinus'>
                <div className='form-heading'>
                    <span className='form-heading-primary'>Join Us</span>
                    <span className='form-heading-secondary'>And Connect with your Mates</span>
                </div>
                <form className='join-us' onSubmit={(e) => {e.preventDefault(); onFormSubmit()}}>
                <ThemeProvider theme={theme}>
                    <div className='join-us-input-field' >
                        <CssTextField  
                            name='rollNumber' 
                            type='text' 
                            variant='outlined' 
                            label='Roll Number' 
                            value={value} 
                            onChange={(e) => {setValue(e.target.value); setErrors({})}}
                            error={errors.rollNumber ? true : false} 
                            helperText={errors.rollNumber}
                        />
                    </div>
                    <ColorButton  type='submit' >Join Us</ColorButton>
                </ThemeProvider>
                </form>
                {loading && <div className='loader'><ChasingDotsSpinner /> </div>}
            </div>
        </div>
        </>
    )
}

const validate = values => {
    const errors = {}
    
    if( !values){
      errors.rollNumber='Required'
    }else if (isNaN(Number(values))) {
        errors.rollNumber = 'Must be a number'
    }

    return errors
}
export default withRouter(JoinUsForm);