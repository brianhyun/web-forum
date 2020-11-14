// Dependencies
import axios from 'axios';

// Redux
import { createSlice } from '@reduxjs/toolkit';

import { setFormErrors } from './errorsSlice';

// Utilities
import storeUsersForumsInLocalStorage from '../../utils/storeUsersForumsInLocalStorage';

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
            .then((response) => {
                // The response data is an object with two fields: forum and userId.
                const userData = response.data;

                // After creating the forum, save user's new forums list to local storage.
                storeUsersForumsInLocalStorage(userData)
                    .then(() => history.push('/join'))
                    .catch((err) => console.error(err));
            })
            .catch((err) => {
                dispatch(setFormErrors(err.response.data));
            });
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
