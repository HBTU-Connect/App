import axios from 'axios'
import * as actions from '../api'
import { baseUrl } from '../config'

// SNA [ store , next, action]
const api = ({ dispatch }) => next => async action => {

    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError, token, onRememberMe } = action.payload;

    if (token) {

        let headers = {}

        headers["Authorization"] = `Bearer ${token}`

        if (onStart)
            dispatch({ type: onStart });

        next(action)

        try {
            const response = await axios.request({
                baseURL: baseUrl,
                url,
                method,
                headers
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

    } else {

        if (onStart)
            dispatch({ type: onStart });

        next(action)

        try {
            const response = await axios.request({
                baseURL: baseUrl,
                url,
                method,
                data
            })

            // general
            dispatch(actions.apiCallSuccess(response.data));

            // Specific
            if (onSuccess)
                dispatch({ type: onSuccess, payload: response.data })

            // 30 * 24 * 60 * 60 * 1000 => 60*1000s * 60m * 24(1day)*30(30days)
            const thirty_days = 30 * 24 * 60 * 60 * 1000;
            const one_day = 24 * 60 * 60 * 1000;
            if (data.rememberMe)
                dispatch({ type: onRememberMe, payload: { token: response.data.refresh_token, ttl: thirty_days } })
            else
                dispatch({ type: onRememberMe, payload: { token: response.data.refresh_token, ttl: one_day } })



        } catch (error) {

            //General
            dispatch(actions.apiCallFailed(error.message));

            //Specific
            if (onError)
                dispatch({ type: onError, payload: error.message });
        }



    }


}


export default api;