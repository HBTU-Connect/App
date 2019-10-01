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

    // if (!values.firstName){
    //   errors.firstName = 'Required'
    // }

    // if( !values.email){
    //   errors.email = 'Required'
    // }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address'
    // }

    // if( !values.phone){
    //   errors.phone = 'Required'
    // }else if (isNaN(Number(values.phone))) {
    //   errors.phone = 'Must be a number'
    // }else if( values.phone.length < 10){
    //   errors.phone = 'Phone No. must have 10 characters'
    // }

    // if( !values.branch){
    //   errors.branch = 'Required'
    // }

    // if( !values.year){
    //   errors.year = 'Required'
    // }

    // if( !values.sex){
    //   errors.sex = 'Required'
    // }   

    if( !values.userName){
      errors.userName='Required'
    }else if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.userName)) {
      errors.userName= 'Username is taken' 
    }else if(!/^[\w]+$/i.test(values.userName)){
      errors.userName='Username can only contain _ '
    }

    if( !values.password){
      errors.password='Required'
    }else if(!/(?=.*[a-z])/i.test(values.password)){
      errors.password='Password must contain an Alphabate'
    }else if( !/(?=.*[0-9])/i.test(values.password)){
      errors.password= 'Password Must contain a Number'
    }else if( !/(?=.[!@#\$%\^&])/i.test(values.password)){
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
  
  export default validate;