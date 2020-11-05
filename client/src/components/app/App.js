// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

// Redux
import { useDispatch } from 'react-redux';
import { setCurrentUser, logoutUser } from '../../redux/slices/authSlice';

// Styles
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../ui/theme';

// Components
import Landing from '../main/Landing';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import PageNotFound from '../main/PageNotFound';

// Protected Components
import PrivateRoute from '../private/PrivateRoute';
import Dashboard from '../main/Dashboard';
import Join from '../forum-auth/Join';
import Create from '../forum-auth/Create';

// Utilities
import setAuthToken from '../../utils/setAuthToken';

function App() {
    const dispatch = useDispatch();

    // Automatically Login User When JWT is Present in Local Storage
    if (localStorage.jwtToken) {
        // Retrieve JWT
        const token = localStorage.jwtToken;

        // Set Auth Header
        setAuthToken(token);

        // Decode JWT and Set Current User
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));

        // Grab Current Time in Milliseconds
        const currentTime = Date.now() / 1000;

        // Check if Token Expired
        if (decoded.exp < currentTime) {
            // Logout User
            dispatch(logoutUser());

            // Redirect to Login
            window.location.href = './login';
        }
    }

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <PrivateRoute exact path="/join" component={Join} />
                        <PrivateRoute exact path="/create" component={Create} />
                        <PrivateRoute
                            exact
                            path="/forum/:id"
                            component={Dashboard}
                        />
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
