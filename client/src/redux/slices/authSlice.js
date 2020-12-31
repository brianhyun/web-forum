// Dependencies
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Redux
import { createSlice } from '@reduxjs/toolkit';
import { setFormErrors } from './errorsSlice';

// Utilities
import storeUsersForumsInLocalStorage from '../../utils/storeUsersForumsInLocalStorage';

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        setAuthStatus: (state) => {
            state.isAuthenticated = true;
        },
        resetAuthStatus: (state) => {
            state.isAuthenticated = false;
        },
    },
});

// Export Actions
export const { setAuthStatus, resetAuthStatus } = slice.actions;

// Login User
export function loginUser(userData, history) {
    return function thunk(dispatch) {
        signInUser(userData, dispatch)
            .then((decodedToken) => {
                return grabAndSetUsersForumsInLocalStorage(decodedToken);
            })
            .then((usersForums) => {
                return redirectUserBasedOnForumCount(usersForums, history);
            })
            .catch((err) => console.error('@loginUser\n', err));
    };
}

async function signInUser(userData, dispatch) {
    try {
        const response = await axios.post('/api/users/login', userData);

        // Set Authentication Status
        dispatch(setAuthStatus());

        // Decode and Return Token to Next Async Operation
        const decodedToken = jwt_decode(response.data.token);

        return decodedToken;
    } catch (err) {
        dispatch(setFormErrors(err.response.data));

        throw new Error('@signInUser');
    }
}

async function grabAndSetUsersForumsInLocalStorage(decodedToken) {
    try {
        const usersForums = await storeUsersForumsInLocalStorage({
            userId: decodedToken.userId,
        });

        return usersForums;
    } catch (err) {
        console.error('@grabAndSetUsersForumsInLocalStorage\n', err);
    }
}

function redirectUserBasedOnForumCount(usersForums, history) {
    try {
        const forumsExist = usersForums.length;

        if (forumsExist) {
            // Grab the first forum in the list and redirect to that page.
            const firstForumId = usersForums[0]._id;

            history.push(`/forum/${firstForumId}`);
        } else {
            history.push('/getStarted');
        }
    } catch (err) {
        console.error('@redirectUserBasedOnForumCount\n', err);
    }
}

// Register User
export function signupUser(userData, history) {
    return function thunk(dispatch) {
        axios
            .post('/api/users/signup', userData)
            .then(() => {
                history.push('/login');
            })
            .catch((err) => dispatch(setFormErrors(err.response.data)));
    };
}

// Log User Out
export function logoutUser() {
    return function thunk(dispatch) {
        // Invalidate Cookies (i.e. JWT)
        axios
            .get('/api/users/deleteJWTCookie')
            .then(() => {
                // Clear Local Storage (i.e. usersForums)
                localStorage.clear();

                // Reset Authentication Status
                dispatch(resetAuthStatus());
            })
            .catch((err) => console.error(err));
    };
}

// Selectors
export function selectAuthStatus(state) {
    return state.auth.isAuthenticated;
}

export default slice.reducer;
