// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { verifyUserAuth } from '../../redux/slices/authSlice';

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
import Forum from '../main/forum/Forum';
import Join from '../forum-auth/Join';
import Create from '../forum-auth/Create';
import GetStarted from '../main/GetStarted';
import UserProfile from '../main/user/UserProfile';
import PostPage from '../main/post/PostPage';

function App() {
    // // Redux Handles
    // const dispatch = useDispatch();

    // dispatch(verifyUserAuth());

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
                            path="/user/:id"
                            component={UserProfile}
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
