const validate = values => {
    const errors = {}

    if (!values.firstName){
      errors.firstName = 'Required'
    }

    if( !values.email){
      errors.email = 'Required'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    if( !values.phone){
      errors.phone = 'Required'
    }else if (isNaN(Number(values.phone))) {
      errors.phone = 'Must be a number'
    }else if( values.phone.length < 10){
      errors.phone = 'Phone No. must have 10 characters'
    }

    if( !values.branch){
      errors.branch = 'Required'
    }

    if( !values.year){
      errors.year = 'Required'
    }

    if( !values.gender){
      errors.gender = 'Required'
    }   


    if( values.declare !== true){
      errors.declare = 'Please Confirm your Details'
    }

    return errors
  }
  
  export default validate;