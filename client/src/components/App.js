import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Styles
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './ui/theme';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from '../redux/store';

// Components
import Landing from './main/Landing';
import Login from './auth/Login';
import Signup from './auth/Signup';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="App">
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                    </div>
                </ThemeProvider>
            </Router>
        </Provider>
    );
}

export default App;
