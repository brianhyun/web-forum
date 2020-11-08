// Dependencies
import axios from 'axios';

// Redux
import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

import { setFormErrors } from './errorsSlice';
import { getUsersForums } from './forumSlice';
import { selectUserId } from './authSlice';

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
            .then(function (response) {
                // Update User's Forums in Redux Store
                const userId = useSelector(selectUserId);

                dispatch(getUsersForums(userId));

                // Redirect to Join Forum Page
                history.push('/join');
            })
            .catch(function (error) {
                dispatch(setFormErrors(error.response.data));
            });
    };
}

// Join Forum
export function joinForum(forumData, history) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/forums/join', forumData)
            .then(function (response) {
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
            .catch(function (error) {
                dispatch(setFormErrors(error.response.data));
            });
    };
}

// Selectors
export function selectPasswordExists(state) {
    return state.forumAuth.passwordExists;
}

export default slice.reducer;
