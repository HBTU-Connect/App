import axios from 'axios';


export const getData = formValues => async dispatch =>  {
    const rollNumber = formValues.rollNumber;
    try{
        // const response = await axios.get('https://students-data-api.herokuapp.com/data', {
        //     params: {
        //         rollNumber: rollNumber
        //     }
        // });
        // if(!response){
            
        // }
        // const date = formValues.dob.split('-');
        // const formatedDOB = `${date[2]}/${date[1]}/${date[0]}`;
        // if(response.data.dob === formatedDOB){
        //     dispatch({
        //         type: 'ADD_DATA',
        //         payload: response.data
        //     })
        // }else{
        //     dispatch({
        //         type: 'ERROR',
        //         payload: {title: "Authorization Failed", msg: "Incorrect DOB. Please enter correct DOB"}
        //     })
        // }
        // let email
        const data = {
            email: `${rollNumber}@hbtu.ac.in`,
            rollNumber: rollNumber
        }

        dispatch({
            type: 'ADD_DATA',
            payload: data
        })
        return true;
        
    }
    catch(error){
        dispatch({
            type: 'ERROR',
            payload: {msg: 'No Student found with that Roll Number. Please check your Roll Number. '}
        })
        return true;
    }
}

export const signUpAction = formValues => async dispatch => {
    const data = formValues
    try{
        const response = await axios.post('http://localhost:5000/register', data, {
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
        } );
        console.log(response)
    }
    catch(error){
        console.log(error)
    }
}