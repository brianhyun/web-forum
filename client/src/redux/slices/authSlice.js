// Dependencies
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

// Redux
import { createSlice } from '@reduxjs/toolkit';
import { setFormErrors } from './errorsSlice';
import { resetFormErrors } from './errorsSlice';

export const slice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        isAuthenticated: false,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        resetCurrentUser: (state) => {
            state.user = {};
            state.isAuthenticated = false;
        },
    },
});

// Export Actions
export const { setCurrentUser, resetCurrentUser } = slice.actions;

// Login User
export function loginUser(userData, history) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/users/login', userData) // Returns a JSON Object with JWT
            .then(function (response) {
                // Reset Form Errors on Successful Login
                dispatch(resetFormErrors);

                // Save JWT to localStorage
                const token = response.data;
                localStorage.setItem('jwtToken', token);

                // Set token to Auth Header
                setAuthToken(token);

                // Decode Token to Get User Data
                const decoded = jwt_decode(token);

                // Set Current User
                dispatch(setCurrentUser(decoded));

                // Push to Dashboard
                history.push('/dashboard');
            })
            .catch(function (error) {
                dispatch(setFormErrors(error.response.data));
            });
    };
}

// Register User
export function signupUser(userData, history) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/users/signup', userData)
            .then(function (response) {
                // Reset Form Errors on Successful Registration
                dispatch(resetFormErrors);

                // Re-direct to Login Page on Successful Registration
                history.push('/login');
            })
            .catch(function (error) {
                dispatch(setFormErrors(error.response.data));
            });
    };
}

// Log User Out
export function logoutUser() {
    return function thunk(dispatch, getState) {
        // Remove JWT Token from Local Storage
        localStorage.removeItem('jwtToken');

        // Remove Auth Header for Future Requests
        setAuthToken(false);

        // Set current user to empty object {} which will set isAuthenticated to false
        dispatch(resetCurrentUser());
    };
}

// Selectors
export function selectAuthStatus(state) {
    return state.auth.isAuthenticated;
}

export default slice.reducer;
