import React, { useState, useEffect } from 'react';
// import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, TextField, InputLabel, MenuItem, FormHelperText, FormControl, Select, FormLabel, Radio, RadioGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import validate from '../utils/validate'


const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiFormControlLabel: {
            root: {
                fontSize: '1.4rem'
            },
            label: {
                lineHeight: '1.3',
                fontFamily: 'unset'
            }
        },
        MuiTextField: {
            root: {
                fontSize: '1.4rem'
            }
        },
        MuiSelect: {
            root: {
                fontSize: '1.4rem'
            },
            outlined: {
                fontFamily: 'unset'
            }
        },
        MuiInputBase: {
            input: {
                fontSize: '1.4rem',
                fontFamily: 'unset'
            },
            formControl: {
                fontSize: '1,4rem',
                fontFamily: 'unset'
            }

        },
        MuiInputLabel: {
            root: {
                fontSize: '1.4rem',
                fontFamily: 'unset'
            }
        },
        MuiOutlinedInput: {
            root: {
                fontSize: '1.4rem'
            }
        },
        MuiMenuItem: {
            root: {
                fontSize: '1.2rem',
                fontFamily: 'unset'
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
            contained: {
                marginRight: '0px',
                marginLeft: '4px'
            }
        }
    },
});

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const NewTextField = withStyles((theme) => ({
    root: {
        fontSize: '1.4rem'
    }
}))(TextField)


// const useStyles = makeStyles((theme) => ({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }));


const SignUpFormFirstPage = (props) => {
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    // const classes = useStyles();

    useEffect(() => {
        setFormValues({ ...formValues, ...props.initialValues, ...props.previousValues })
        // console.log(props.initialValues)
        // eslint-disable-next-line
    }, [])

    const handleFormSubmit = () => {
        const errors = validate(formValues)
        setFormErrors(errors)
        // console.log(formValues)
        if (Object.keys(errors).length === 0) {
            props.onSubmit(formValues)
        }

    }

    const handleFieldChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (formErrors[name])
            setFormErrors({ ...formErrors, [name]: '' })

        if (name === 'declare') {
            let declare
            if (formValues.declare) declare = false
            else declare = true
            setFormValues({ ...formValues, declare })
        }
        else
            setFormValues({ ...formValues, [name]: value })
    }

    return (
        <div className='form-container__sign-up'>
            <div className='form-heading'>
                Confirm Details
                <div className='divider'></div>
            </div>
            {/* <form> */}
            <ThemeProvider theme={theme}>
                <div className='input-field__signup name-field'>
                    <NewTextField error={formErrors.firstName ? true : false} helperText={formErrors.firstName} margin='dense' label='First Name' variant='outlined' type='text' name='firstName' value={formValues.firstName} onChange={(e) => { handleFieldChange(e) }} />
                    <NewTextField error={formErrors.lastName ? true : false} helperText={formErrors.lastName} margin='dense' label='Last Name' variant='outlined' type='text' name='lastName' value={formValues.lastName} onChange={(e) => { handleFieldChange(e) }} />
                </div>
                <div className='input-field__signup'>
                    <NewTextField /*disabled={formValues.email ? true : false}*/ error={formErrors.email ? true : false} margin='dense' helperText={formErrors.email} label='Email' variant='outlined' type='email' name='email' value={formValues.email} onChange={(e) => { handleFieldChange(e) }} />
                </div>
                <div className='input-field__signup'>
                    <NewTextField error={formErrors.phone ? true : false} margin='dense' helperText={formErrors.phone} label='Phone' variant='outlined' name='phone' value={formValues.phone} onChange={(e) => { handleFieldChange(e) }} />
                </div>
                <div className='input-field__signup'>
                    <FormControl variant="outlined" margin='dense' error={formErrors.branch ? true : false} >
                        <InputLabel id="select-branch-label">Branch</InputLabel>
                        <Select
                            labelId="select-branch-label"
                            id="select-branch"
                            name='branch'
                            value={formValues.branch}
                            onChange={(e) => handleFieldChange(e)}
                            label="Branch"
                        >
                            <MenuItem value='cse'>Computer Sc. {' & '} Engg.</MenuItem>
                            <MenuItem value='ee'>Electrical Engg.</MenuItem>
                            <MenuItem value='et'>Electronics Engg.</MenuItem>
                            <MenuItem value='ce'>Civil Engg.</MenuItem>
                            <MenuItem value='me'>Mechanical Engg.</MenuItem>
                            <MenuItem value='che'>Chemical Engg.</MenuItem>
                            <MenuItem value='it'>Information Technology</MenuItem>
                        </Select>
                        <FormHelperText>{formErrors.branch} </FormHelperText>
                    </FormControl>
                </div>
                <div className='input-field__signup'>
                    <FormControl variant="outlined" margin='dense' error={formErrors.year ? true : false} >
                        <InputLabel id="select-year-label">Year</InputLabel>
                        <Select
                            labelId="select-year-label"
                            id="select-year"
                            name='year'
                            value={formValues.year}
                            onChange={(e) => handleFieldChange(e)}
                            style={{ width: '100%', fontSize: '1.4rem' }}
                            label="Year"
                        >
                            <MenuItem value='first'>First</MenuItem>
                            <MenuItem value='second'>Second</MenuItem>
                            <MenuItem value='third'>Third</MenuItem>
                            <MenuItem value='final'>Final</MenuItem>
                        </Select>
                        <FormHelperText>{formErrors.year} </FormHelperText>
                    </FormControl>
                </div>
                <div className='input-field__signup'>
                    <FormControl component="fieldset" error={formErrors.gender ? true : false}  >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row aria-label="position" name="gender" value={formValues.gender} onChange={(e) => handleFieldChange(e)} >
                            <FormControlLabel
                                value="male"
                                control={<GreenRadio color="primary" />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="female"
                                control={<GreenRadio color="primary" />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="other"
                                control={<GreenRadio color="primary" />}
                                label="Other"
                            />
                        </RadioGroup>
                        <FormHelperText>{formErrors.gender} </FormHelperText>
                    </FormControl>
                </div>
                <div className='input-field__signup last'>
                    <FormControl error={formErrors.declare ? true : false}>
                        <FormControlLabel
                            className='signup-form-declare-label'
                            control={<GreenCheckbox checked={formValues.declare} onChange={(e) => handleFieldChange(e)} name="declare" />}
                            label="I hereby declare that all the details maintioned above belongs to me."
                        />
                        <FormHelperText>{formErrors.declare} </FormHelperText>
                    </FormControl>
                </div>

                <div className='form-button'>
                    <Button variant='text' onClick={handleFormSubmit} className="next">
                        Next
                    </Button>
                </div>
            </ThemeProvider>
            {/* </form> */}
        </div>

    )
}

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    branch: '',
    year: '',
    gender: '',
    declare: false
}


//   const formWrapper =  reduxForm({
//     form: 'signup', // <------ same form name
//     destroyOnUnmount: false, // <------ preserve form data
//     forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
//     validate
//   })(SignUpFormFirstPage);

//   const mapStateToProps = (state) => {
//         return { initialValues: state.userData.data}
//   }

export default SignUpFormFirstPage