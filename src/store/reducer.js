import { combineReducers } from 'redux';
import entitiesReducer from  './entities';

import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    entities: entitiesReducer,
    forms: formReducer,
})