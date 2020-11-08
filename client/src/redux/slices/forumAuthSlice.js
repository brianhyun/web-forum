// Dependencies
import axios from 'axios';

// Redux
import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

import { setFormErrors } from './errorsSlice';
import { selectUserId } from './authSlice';

// Utilities
import setUsersForumsInLocalStorage from '../../utils/setUsersForums';

export const slice = createSlice({
    name: 'forumAuth',
    initialState: {
        passwordExists: false,
    },
    reducers: {
        setPublic: (state) => {
            state.passwordExists = false;
        },
        setPrivate: (state) => {
            state.passwordExists = true;
        },
        resetPrivacyStatus: (state) => {
            state.passwordExists = false;
        },
    },
});

// Export Actions
export const { setPublic, setPrivate, resetPrivacyStatus } = slice.actions;

// Create Forum
export function createForum(forumData, history) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/forums/create', forumData)
            .then(() => {
                // Update User's Forums in Local Storage
                const userData = {
                    userId: useSelector(selectUserId),
                };

                setUsersForumsInLocalStorage(userData)
                    .then(() => {
                        // Redirect User to Forum Join Page
                        history.push('/join');
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => dispatch(setFormErrors(err.response.data)));
    };
}

// Join Forum
export function joinForum(forumData, history) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/forums/join', forumData)
            .then((response) => {
                const isPublic = response.data.isPublic;
                const forumId = response.data.forumId;
                const userIsAuthenticated = response.data.userIsAuthenticated;

                if (isPublic) {
                    dispatch(setPublic());

                    history.push(`/forum/${forumId}`);
                } else {
                    if (userIsAuthenticated) {
                        history.push(`/forum/${forumId}`);
                    } else {
                        dispatch(setPrivate());
                    }
                }
            })
            .catch((err) => dispatch(setFormErrors(err.response.data)));
    };
}

// Selectors
export function selectPasswordExists(state) {
    return state.forumAuth.passwordExists;
}

export default slice.reducer;
