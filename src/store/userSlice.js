import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect'
import { apiCallBegan, apiCallFailed } from './api';
import { registerUrl, loginUrl, refreshTokenUrl, logoutUrl, updateDetailsUrl } from './config'

const USER_REDIRECT_AFTER_LOGIN = "/feeds"
const USER_REDIRECT_AFTER_REGISTER = "/login"
const USER_REDIRECT_AFTER_LOGOUT = "/login"
const cookie_name = "csrftoken"

// creates Actioncreators and reducers.
const slice = createSlice({
    name: 'user',
    initialState: {
        info: {},
        errors: {},
        loading: false,
        about: {},
        settings: {},
        redirectTo: false,
    },
    reducers: {
        // action => actionHandlers
        userRequested: (user, action) => {
            user.loading = true;
        },
        userRequestFailed: (user, action) => {
            user.loading = false;
            user.info = {}
            user.errors = action.payload;
            console.clear()
        },
        userReceived: (user, action) => {
            user.loading = false;
            user.info = { ...user.info, ...action.payload.info };
            user.about = action.payload.about;
            user.settings = action.payload.privacy
            user.redirectTo = USER_REDIRECT_AFTER_LOGIN;
        },
        userRegistered: (user, action) => {
            user.loading = false;
            user.info = action.payload;
            user.errors = "";
            user.redirectTo = USER_REDIRECT_AFTER_REGISTER;
        },
        userLoggedIn: (user, action) => {
            user.loading = false;
            user.info = action.payload.info;
            user.about = action.payload.about;
            user.settings = action.payload.privacy
            user.errors = "";
            user.redirectTo = USER_REDIRECT_AFTER_LOGIN;
        },
        userLoggedOut: (user, action) => {
            user.info = action.payload;
            user.redirectTo = USER_REDIRECT_AFTER_LOGOUT;

        },
        updateUserDetailsRequested: (user, action) => {
            user.loading = true
        },
        updateUserDetailsSuccess: (user, action) => {
            user.loading = false;
            user.about = action.payload.about
            user.settings = action.payload.privacy
        },
        updateUserDetailsFailed: (user, action) => {
            user.loading = false
        }

    }
})

export const {
    userRequested,
    userRequestFailed,
    userReceived,
    userRegistered,
    userLoggedIn,
    userLoggedOut,
    updateUserDetailsSuccess,
    updateUserDetailsRequested,
    updateUserDetailsFailed
} = slice.actions
export default slice.reducer;


// helpers

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
            onError: userRequestFailed.type
        })
    );
}

// export const revokeAccessToken = (token) => (dispatch, getState) => {

//     return apiCallBegan({
//         url: revokeAccessTokenUrl,
//         method: "get",
//         token: token
//     })
//     // dispatch(
//     // );
// }

// export const revokeRefreshToken = (token) => (dispatch, getState) => {

//     return apiCallBegan({
//         url: revokeRefreshTokenUrl,
//         method: "get",
//         token: token
//     })
//     // dispatch(

//     // );
// }

export const logoutUser = () => (dispatch, getState) => {

    // const { refresh_token, access_token } = getState().user.info;

    // dispatch(revokeAccessToken(access_token));
    // dispatch(revokeRefreshToken(refresh_token));

    return dispatch(
        apiCallBegan({
            url: logoutUrl,
            method: "get",
            onSuccess: userLoggedOut.type
        })
    );
}

// helper for loading user when app visited 
export const loadUser = () => (dispatch, getState) => {

    return dispatch(
        apiCallBegan({
            url: refreshTokenUrl,
            method: "get",
            onStart: userRequested.type,
            onSuccess: userReceived.type,
            onError: userRequestFailed.type
        })
    );
}

// helper for updating user details
export const updateDetails = (details) => (dispatch, getState) => {

    // console.log(details)
    // return
    return dispatch(
        apiCallBegan({
            url: updateDetailsUrl,
            method: "post",
            data: details,
            onStart: updateUserDetailsRequested.type,
            onSuccess: updateUserDetailsSuccess.type,
            onError: updateUserDetailsFailed.type,
        })
    )
}

// Selectors

// gives user info from state
export const getUserInfo = createSelector(
    state => state.user,
    user => user.info
)

export const getErrors = createSelector(
    state => state.user.errors,
    errors => errors
)

export const getUIInfo = createSelector(
    state => state.user.loading,
    loading => loading
)





