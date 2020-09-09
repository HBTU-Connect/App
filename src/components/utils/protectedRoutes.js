import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return (isAuthenticated ? <Component {...props} /> : <Redirect to='/' /> );
            }} />
    );
};