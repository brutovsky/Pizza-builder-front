import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({component: Component, currentUser, roles, ...rest }) => (
    <Route {...rest} render={props => {
        if (!currentUser) {
            return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        }

        if (roles && roles.indexOf(currentUser.role) === -1) {
            return <Redirect to={{ pathname: '/'}} />
        }

        return <Component {...props} />
    }} />
)
