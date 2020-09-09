import { combineReducers } from 'redux';
import userReducer from './userSlice'
import UIReducer from './UISlice'
import utilsReducer from './utilsSlice'

import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    user: userReducer,
    UI: UIReducer,
    utils: utilsReducer,
    forms: formReducer
})