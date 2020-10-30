// Dependencies
import axios from 'axios';

// Redux
import { createSlice } from '@reduxjs/toolkit';
import { setFormErrors } from './errorsSlice';

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
                const userIsAuthenticated = response.data.userIsAuthenticated;

                if (isPublic) {
                    // Public Forum - Set Password State to False
                    dispatch(setPublic());

                    // Redirect to Forum Home Page
                    history.push('/create');
                } else {
                    /*
						Private Forum - Set Password State to True

						There's no need to redirect to the form page.
						As long as the store is updated, the useSelector method 
						in the join page will immediately tell the UI to update appropriately. 
					*/
                    if (userIsAuthenticated) {
                        // User Submitted Password for Private Forum
                        history.push('/create');
                    } else {
                        // User Submitted Name for Private Forum
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
