import { combineReducers } from 'redux';
import userReducer from './user';
import UIReducer from './UI'

export default combineReducers({
    user: userReducer,
    UI: UIReducer,
})