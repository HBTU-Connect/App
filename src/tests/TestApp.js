import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import reduxThunk from 'redux-thunk';

import App from '../components/app';
import '../scss/main.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers, 
    composeEnhancers(applyMiddleware(reduxThunk))
    );

const TestApp = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider> 
    )
}

export default TestApp