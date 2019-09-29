const validate = values => {
    const errors = {}
    if (!values.rollNumber) {
      errors.rollNumber = 'Required'
    } else if (isNaN(Number(values.rollNumber))) {
      errors.rollNumber = 'Must be a number'
    }
    if (!values.dob) {
      errors.dob = 'Required'
    }
    return errors
  }
  
  export default validate;