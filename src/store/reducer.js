import { combineReducers } from 'redux';
import userReducer from './userSlice'

import { reducer as formReducer } from 'redux-form'

export default combineReducers({
<<<<<<< HEAD
    entities: entitiesReducer,
    forms: formReducer,
=======
    user: userReducer,
>>>>>>> 74084a6c7c012ca3cd1e9fb77ad7ef4c568b74ff
})