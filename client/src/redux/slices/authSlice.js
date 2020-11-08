// Dependencies
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

// Redux
import { createSlice } from '@reduxjs/toolkit';
import { setFormErrors } from './errorsSlice';

// Utilities
import setUsersForumsInLocalStorage from '../../utils/setUsersForums';

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
            .then((response) => {
                // Save JWT to localStorage
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);

                // Set token to Auth Header
                setAuthToken(token);

                // Decode Token to Get User Data
                const decoded = jwt_decode(token);

                // Set Current User
                dispatch(setCurrentUser(decoded));

                return response;
            })
            .then((response) => {
                // Set Users Forums in Local Storage
                const userData = {
                    userId: response.data.userId,
                };

                // This asynchronous operation isn't returning anything or directing the user to any particular location.
                setUsersForumsInLocalStorage(userData)
                    .then(() => {
                        // Redirect User to Dashboard
                        history.push('/dashboard');
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => dispatch(setFormErrors(err.response.data)));
    };
}

// Register User
export function signupUser(userData, history) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/users/signup', userData)
            .then(() => {
                // Re-direct to Login Page on Successful Registration
                history.push('/login');
            })
            .catch((error) => dispatch(setFormErrors(error.response.data)));
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

export function selectUserId(state) {
    return state.auth.user.id;
}

export default slice.reducer;
