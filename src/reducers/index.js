import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { userReducer, authReducer, UIReducer } from './authReducer';

export default combineReducers({
    form: formReducer,
    userData: userReducer,
    authData: authReducer,
    UIData: UIReducer
});