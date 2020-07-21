import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { registerUrl, loginUrl,refreshTokenUrl, revokeAccessTokenUrl, revokeRefreshTokenUrl } from './config'
import moment from 'moment'

// creates Actioncreators and reducers.
const slice = createSlice({
    name: 'user',
    initialState:{
        info: {},
        errors:{},
        loading: false,
        lastFetch: null
    },
    reducers:{
        // action => actionHandlers
        userRequested: (user,action) => {
            user.loading = true;
        },
        userRequestFailed: (user, action) => {
            user.loading = false;
            user.info = {}
            user.errors = action.payload
        },
        userReceived: (user, action) => {
            user.loading = false;
            user.info.access_token = action.payload.access_token;
            user.lastFetch = Date.now();
        },
        userRegistered: (user, action) => {
            user.loading = false;
            user.info = action.payload;
            user.lastFetch = Date.now();
        },
        userLoggedIn: (user,action) => {
            user.loading = false;
            user.info = action.payload;
            user.lastFetch = Date.now(); 
        },
        userLoggedOut: (user, action) => {
            user.info = {}
        }

    }
})

export const { userRequested, userRequestFailed, userReceived, userRegistered, userLoggedOut, userLoggedIn } = slice.actions
export default slice.reducer;


// helpers
export const registerUser = user => (dispatch, getState) => {
    
    dispatch(
        apiCallBegan({
            url: registerUrl,
            method: "post",
            data: user,
            onStart: userRequested.type,
            onSuccess: userRegistered.type,
            onError: userRequestFailed.type
        })
    );
}

export const loginUser = user  => (dispatch, getState) => {
    
    dispatch(
        apiCallBegan({
            url: loginUrl,
            method: "post",
            data: user,
            onStart: userRequested.type,
            onSuccess: userLoggedIn.type,
            onError: userRequestFailed.type
        })
    );
}

export const revokeAccessToken = () => (dispatch, getState) => {
    
    return dispatch(
        apiCallBegan({
            url: revokeAccessTokenUrl,
            method: "post",
            token: getState().entities.user.access_token
        })
    );
}

export const revokeRefreshToken = () => (dispatch, getState) => {
    
    return dispatch(
        apiCallBegan({
            url: revokeRefreshTokenUrl,
            method: "post",
            token: getState().entities.user.refresh_token
        })
    );
}

export const logoutUser = () => (dispatch, getState) => {

    return dispatch({type: userLoggedOut.type});
} 

export const loadUser = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.user;
    
    const { refresh_token } = getState().entities.user;

    // if(!refresh_token) return;
    const diffInDays = moment().diff(moment(lastFetch), 'days');
    if(diffInDays < 1) return;

    return dispatch(
        apiCallBegan({
            url: refreshTokenUrl,
            token: refresh_token,
            onStart: userRequested.type,
            onSuccess: userReceived.type,
            onError: userRequestFailed.type
        })
    );
}



