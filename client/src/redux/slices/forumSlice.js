// Dependencies
import axios from 'axios';

// Redux
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'forum',
    initialState: {
        usersForums: [],
    },
    reducers: {
        setUsersForums: (state, action) => {
            state.usersForums = action.payload;
        },
    },
});

// Export Actions
export const { setUsersForums } = slice.actions;

// Create Forum
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

// Selectors
export function selectUsersForums(state) {
    return state.forum.usersForums;
}

export default slice.reducer;
