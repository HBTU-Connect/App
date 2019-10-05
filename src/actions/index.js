import axios from 'axios';


export const getData = formValues => async dispatch =>  {
    const rollNumber = formValues.rollNumber;

    const response = await axios.get('http://localhost:8080/data', {
        params: {
            rollNumber: rollNumber
        }
    });
    const date = formValues.dob.split('-');
    const formatedDOB = `${date[2]}/${date[1]}/${date[0]}`;
    if(response.data.dob === formatedDOB){
        dispatch({
            type: 'ADD_DATA',
            payload: response.data
        })
    }else{
        dispatch({
            type: 'ERROR',
            payload: {title: "Authorization Failed", msg: "Incorrect DOB. Please enter correct DOB"}
        })
    }
}