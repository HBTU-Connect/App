import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return (isAuthenticated ? <Redirect to='/' /> : <Component {...props} />);
            }} />
    );
};