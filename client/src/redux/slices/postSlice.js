// Dependencies
import axios from 'axios';

// Redux
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'post',
    initialState: {},
    reducers: {},
});

// Export Actions
// export const {  } = slice.actions;

// Get Info on Specific Forum
export function addNewPost(postData) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/posts/create', postData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.error(err));
    };
}

export function getForumPosts(forumId) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/posts/getForumPosts', forumId)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.error(err));
    };
}

// Selectors
// export function select(state) {
//     return state.post.posts;
// }

export default slice.reducer;
