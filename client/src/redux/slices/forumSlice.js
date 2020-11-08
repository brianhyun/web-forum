// Dependencies
import axios from 'axios';

// Redux
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'forum',
    initialState: {
        usersForums: [],
        currentForum: {},
    },
    reducers: {
        setUsersForums: (state, action) => {
            state.usersForums = action.payload;
        },
        setCurrentForum: (state, action) => {
            state.currentForum = action.payload;
        },
    },
});

// Export Actions
export const { setUsersForums, setCurrentForum } = slice.actions;

// Get Users Forums
export function getUsersForums(userData) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/forums/getUsersForums', userData)
            .then((response) => {
                const forumsInfo = response.data;

                dispatch(setUsersForums(forumsInfo));
            })
            .catch((err) => console.error(err));
    };
}

// Get Info on Specific Forum
export function getForumInfo(forumId) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/forums/getForumInfo', forumId)
            .then((response) => {
                const forum = response.data;

                dispatch(setCurrentForum(forum));
            })
            .catch((err) => console.error(err));
    };
}

// Selectors
export function selectUsersForums(state) {
    return state.forum.usersForums;
}

export function selectCurrentForum(state) {
    return state.forum.currentForum;
}

export default slice.reducer;
