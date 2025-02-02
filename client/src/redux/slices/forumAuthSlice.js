// Dependencies
import axios from 'axios';

// Redux
import { createSlice } from '@reduxjs/toolkit';

import { setFormErrors, resetFormErrors } from './errorsSlice';

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
    return function thunk(dispatch) {
        axios
            .post('/api/forums/create', forumData)
            .then((response) => {
                // On Successful Forum Creation, Reset Form Errors
                dispatch(resetFormErrors());

                const newForumLink = `/forum/${response.data.forumId}`;

                // Save user's new forums list to local storage.
                storeUsersForumsInLocalStorage({ userId: response.data.userId })
                    .then(() => history.push(newForumLink))
                    .catch((err) => console.error(err));
            })
            .catch((err) => dispatch(setFormErrors(err.response.data)));
    };
}

// Join Forum
export function joinForum(forumData, history) {
    return function thunk(dispatch) {
        axios
            .post('/api/forums/join', forumData)
            .then((response) => {
                // On Successful Forum Join, Reset Forum Errors
                dispatch(resetFormErrors());

                // Save user's new forums list to local storage.
                storeUsersForumsInLocalStorage({
                    userId: response.data.userId,
                })
                    .then(() => {
                        const isPublic = response.data.isPublic;
                        const forumId = response.data.forumId;

                        if (isPublic) {
                            dispatch(setPublic());

                            history.push(`/forum/${forumId}`);
                        } else {
                            const userIsAuthenticated =
                                response.data.userIsAuthenticated;

                            if (userIsAuthenticated) {
                                history.push(`/forum/${forumId}`);
                            } else {
                                dispatch(setPrivate());
                            }
                        }
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => dispatch(setFormErrors(err.response.data)));
    };
}

// Selectors
export function selectPasswordExists(state) {
    return state.forumAuth.passwordExists;
}

export default slice.reducer;
