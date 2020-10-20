import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Styles
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../ui/theme';

// Components
import Landing from '../main/Landing';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Dashboard from '../main/Dashboard';

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="App">
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
