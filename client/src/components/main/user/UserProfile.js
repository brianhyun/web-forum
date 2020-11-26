// Dependencies
import React from 'react';

// Redux
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../../redux/slices/authSlice';

// Material UI Components
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function UserProfile() {
    // Redux Handles
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logoutUser());
    }

    return (
        <Box>
            <h1>Yo, it's me!</h1>
            <Button onClick={handleLogout} variant="contained" color="primary">
                Logout
            </Button>
        </Box>
    );
}

export default UserProfile;
