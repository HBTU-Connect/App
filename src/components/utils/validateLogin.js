const validate = values => {
    const errors = {}
    
    if( !values.userName){
      errors.userName='Required'
    }

    if( !values.password){
      errors.password='Required'
    }

    return errors
  }
  
  export default validate;