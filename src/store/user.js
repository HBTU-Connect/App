import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect'
import { apiCallBegan } from './api';
import { registerUrl, loginUrl, refreshTokenUrl, revokeAccessTokenUrl, revokeRefreshTokenUrl } from './config'
import moment from 'moment'
import { darkBaseTheme } from 'material-ui/styles';

// creates Actioncreators and reducers.
const slice = createSlice({
    name: 'user',
    initialState: {
        info: {
            refresh_token: localStorage.getItem("refresh_token"),
        },
        errors: {},
        loading: false,
        lastFetch: null
    },
    reducers: {
        // action => actionHandlers
        userRequested: (user, action) => {
            user.loading = true;
        },
        userRequestFailed: (user, action) => {
            user.loading = false;
            user.info = {}
            user.errors = action.payload
        },
        userReceived: (user, action) => {
            user.loading = false;
            user.info = { ...user.info, ...action.payload };
            user.lastFetch = Date.now();
        },
        userRegistered: (user, action) => {
            user.loading = false;
            user.info = action.payload;
            localStorage.setItem("refresh_token", user.info.refresh_token);
            user.lastFetch = Date.now();
        },
        userLoggedIn: (user, action) => {
            user.loading = false;
            user.info = action.payload;
            // localStorage.setItem("refresh_token", user.info.refresh_token);
            user.lastFetch = Date.now();
        },
        userLoggedOut: (user, action) => {
            localStorage.removeItem("refresh_token", user.info.refresh_token);
            user.info = {}
        },
        userRememberMe: (user, action) => {
            localStorage.setItem("rememberMe", true)
            localStorage.setItem("refresh_token", action.payload)
        }

    }
})

export const { userRequested, userRequestFailed, userReceived, userRegistered, userLoggedOut, userLoggedIn, userRememberMe } = slice.actions
export default slice.reducer;


// helpers

// helper for loading user when app visited 
export const loadUser = () => (dispatch, getState) => {
    if (!localStorage["rememberMe"]) return;

    const { lastFetch } = getState().entities.user;
    let { refresh_token } = getState().entities.user.info;

    const diffInDays = moment().diff(moment(lastFetch), 'days');
    if (diffInDays < 1) return;

    if (!refresh_token) refresh_token = 'invalid'

    return dispatch(
        apiCallBegan({
            url: refreshTokenUrl,
            method: "post",
            token: refresh_token,
            onStart: userRequested.type,
            onSuccess: userReceived.type,
            onError: userRequestFailed.type
        })
    );
}

// helper for registration of user
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

export const loginUser = user => (dispatch, getState) => {

    dispatch(
        apiCallBegan({
            url: loginUrl,
            method: "post",
            data: user,
            onStart: userRequested.type,
            onSuccess: userLoggedIn.type,
            onError: userRequestFailed.type,
            onRememberMe: userRememberMe.type
        })
    );
}

export const revokeAccessToken = (token) => (dispatch, getState) => {

    return dispatch(
        apiCallBegan({
            url: revokeAccessTokenUrl,
            method: "get",
            token: token
        })
    );
}

export const revokeRefreshToken = (token) => (dispatch, getState) => {

    return dispatch(
        apiCallBegan({
            url: revokeRefreshTokenUrl,
            method: "get",
            token: token
        })
    );
}

export const logoutUser = () => (dispatch, getState) => {

    const { refresh_token, access_token } = getState().entities.user.info;

    dispatch(revokeAccessToken(access_token));
    dispatch(revokeRefreshToken(refresh_token));

    return dispatch({ type: userLoggedOut.type });
}

// Selectors

// gives user info from state
export const getUserInfo = createSelector(
    state => state.entities.user,
    user => user.info
)





