// Dependencies
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Redux
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';

// Styles
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../ui/theme';

// Components
import Landing from '../onboard/Landing';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import PageNotFound from '../error/PageNotFound';

// Protected Components
import PrivateRoute from '../private/PrivateRoute';
import Forum from '../forum/Forum';
import Join from '../forum-auth/Join';
import Create from '../forum-auth/Create';
import GetStarted from '../onboard/GetStarted';
import PostPage from '../post/PostPage';

function App() {
    // Validate JWT as a Component Effect
    const dispatch = useDispatch();

    async function validateJWT() {
        const response = await axios.get('/api/users/validateJWT');
        const jwtExpired = response.data;

        if (jwtExpired) {
            dispatch(logoutUser());
        }
    }

    useEffect(() => {
        validateJWT();
    });

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
                            path="/getStarted"
                            component={GetStarted}
                        />
                        <PrivateRoute exact path="/join" component={Join} />
                        <PrivateRoute exact path="/create" component={Create} />
                        <PrivateRoute
                            exact
                            path="/forum/:id"
                            component={Forum}
                        />
                        <PrivateRoute
                            exact
                            path="/post/:id"
                            component={PostPage}
                        />
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
