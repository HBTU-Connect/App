import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { authReducer, UIReducer } from './authReducer';
// import { headerDisplayReducer } from './headerDisplayReducer'

export default combineReducers({
    form: formReducer,
    userData: authReducer,
    UIData: UIReducer
    // dispayHeader: headerDisplayReducer
});