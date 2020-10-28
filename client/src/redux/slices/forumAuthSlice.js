// Dependencies
import axios from 'axios';

// Redux
import { setFormErrors } from './errorsSlice';

// Create Forum
export function createForum(forumData, history) {
    return function thunk(dispatch, getState) {
        axios
            .post('/api/forums/create', forumData)
            .then(function (response) {
                history.push('/join');
            })
            .catch(function (error) {
                dispatch(setFormErrors(error.response.data));
            });
    };
}
