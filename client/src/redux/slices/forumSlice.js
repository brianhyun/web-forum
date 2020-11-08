// Dependencies
import axios from 'axios';

// Redux
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'forum',
    initialState: {
        currentForum: {},
    },
    reducers: {
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
                const usersForums = response.data;

                localStorage.setItem(
                    'usersForums',
                    JSON.stringify(usersForums)
                );
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
export function selectCurrentForum(state) {
    return state.forum.currentForum;
}

export default slice.reducer;
