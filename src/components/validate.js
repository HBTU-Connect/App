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

    if( !values.sex){
      errors.sex = 'Required'
    }

    if( !values.userName){
      errors.userName='Required'
    }else if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.userName)) {
      errors.userName= 'Username is taken' 
    }

    if( !values.password){
      errors.password='Required'
    }

    if( values.confirmPassword !== values.password){
      errors.confirmPassword = 'Passwords do not Match'
    }

    return errors
  }
  
  export default validate;