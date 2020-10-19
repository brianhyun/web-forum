import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/theme';
import './App.css';

import Login from './auth/Login';
import Signup from './auth/Register';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Login />
                <Signup />
            </div>
        </ThemeProvider>
    );
}

export default App;
