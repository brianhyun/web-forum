// Dependencies
import axios from 'axios';

// Redux
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'forumAuth',
    initialState: {},
    reducers: {},
});

// Create Forum
export function createForum(forumData, history) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/forums/create', forumData)
            .then(function (response) {
                console.log('inside forumAuthSlice:', response.data);
                history.push('/join');
            })
            .catch(function (error) {
                console.error('createForum function in forumAuthSlice:', error);
                dispatch();
            });
    };
}
