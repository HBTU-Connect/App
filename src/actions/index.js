import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
  })


export const getData = formValues => async dispatch =>  {
    const rollNumber = formValues.rollNumber;
    try{
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
        const response = await axiosInstance.post('/register', data, {
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
        } )
        dispatch({
            type: 'SIGN_UP',
            payload: response.data
        })
        return true
    }
    catch(error){
        // Promise.reject({...error})
        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: 'ERROR',
                payload: error.response.data.error
            })
        }
        else{
            dispatch({
                type: 'ERROR',
                payload: error.message
            })
        }
        return true
    }
}

export const loginAction = formValues => async dispatch => {
    const data = formValues
    try{
        const response = await axiosInstance.post('/login', data, {
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
        } )
        dispatch({
            type: 'LOGIN',
            payload: response.data
        })
        return true
    }
    catch(error){
        console.log(error.response)
        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: 'ERROR',
                payload: error.response.data.error
            })
        }
        else{
            dispatch({
                type: 'ERROR',
                payload: error.message
            })
        }
        return true
    }
}


export const logoutAction = (token) => async dispatch => {
    try{
        const response = await axiosInstance.get('/logout/access', {
            headers:{
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`
            }
        } )
        dispatch({
            type: 'LOGOUT',
            payload: response.data
        })
        return true
    }
    catch(error){
        console.log(error.response)
        if(error.response && error.response.data && error.response.data.error){
            dispatch({
                type: 'ERROR',
                payload: error.response.data.error
            })
        }
        else{
            dispatch({
                type: 'ERROR',
                payload: error.message
            })
        }
        return true
    }
}
