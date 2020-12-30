// Dependencies
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

// Redux
import { createSlice } from '@reduxjs/toolkit';
import { setFormErrors } from './errorsSlice';

// Utilities
import storeUsersForumsInLocalStorage from '../../utils/storeUsersForumsInLocalStorage';

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

        // Set Default Headers for Every Axios Request
        const token = response.data.token;
        setAuthToken(token);

        // Set Current User in Redux
        const decodedToken = jwt_decode(token);
        dispatch(setCurrentUser(decodedToken));

        return decodedToken;
    } catch (err) {
        dispatch(setFormErrors(err.response.data));

        throw new Error('@signInUser');
    }
}

async function grabAndSetUsersForumsInLocalStorage(decodedToken) {
    // The decoded token contains the userId, which is needed to query the user's document (in database), which contains the user's forums.
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
    return function thunk(dispatch, getState) {
        axios
            .post('/api/users/signup', userData)
            .then(() => {
                history.push('/login');
            })
            .catch((error) => dispatch(setFormErrors(error.response.data)));
    };
}

// Log User Out
export function logoutUser() {
    return function thunk(dispatch, getState) {
        // Clear Local Storage (i.e. usersForums) and Cookies (i.e. JWT)
        localStorage.clear();

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
    return state.auth.user.userId;
}

export function selectUsername(state) {
    return state.auth.user.username;
}

export default slice.reducer;
