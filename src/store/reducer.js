import { combineReducers } from 'redux';
import userReducer from './userSlice'

export default combineReducers({
    user: userReducer,
})