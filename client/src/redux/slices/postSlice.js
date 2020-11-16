// Dependencies
import axios from 'axios';

// Redux
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'post',
    initialState: {},
    reducers: {},
});

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

export default slice.reducer;
