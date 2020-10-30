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

                // This value will only be true when the user has submitted a matching password to a private forum.
                const userIsAuthenticated = response.data.userIsAuthenticated;

                if (isPublic) {
                    /* 
						The forum with the provided name is a public forum. 

						(1) Set the forum state to public &
						(2) Direct the user to the forum's home page. 
					*/
                    dispatch(setPublic());

                    // Redirect to Forum Home Page
                    history.push('/create');
                } else {
                    /*
						The forum with the provided name is a private forum. 

						(1) If the user has been authenticated, then send them to the forum's home page. OR 
						(2) If the userIsAuthenticated field doesn't exist, then that means a password wasn't submitted. 
						We have verified that the forum with the provided name is a private forum and requires a password. 
						The else statement will update the store to represent that a password exists and is required.
						
						No redirects are required as a useSelector method is used in the join page, which 
						immediately tells the UI to update according to changes to the store. 
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
