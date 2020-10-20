import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../redux/slices/authSlice';

function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = useSelector(selectAuthStatus);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default PrivateRoute;
