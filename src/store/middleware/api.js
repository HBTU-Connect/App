import axios from 'axios'
import * as actions from '../api'
import { baseUrl } from '../config'

// get CSRF cookie from cookies
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// SNA [ store , next, action]
const api = ({ dispatch }) => next => async action => {

    console.log(action, action.type)

    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart)
        dispatch({ type: onStart });

    next(action)

    try {


        const response = await axios.request({
            baseURL: baseUrl,
            url,
            method,
            data,
            headers: { 'X-CSRF-TOKEN': getCookie('csrf_access_token') },
            withCredentials: true
        })

        // general
        dispatch(actions.apiCallSuccess(response.data));

        // Specific
        if (onSuccess)
            dispatch({ type: onSuccess, payload: response.data })


    } catch (error) {

        //General
        dispatch(actions.apiCallFailed(error.message));

        //Specific
        if (onError)
            dispatch({ type: onError, payload: error.message });
    }


}


export default api;