import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

function App() {
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
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
