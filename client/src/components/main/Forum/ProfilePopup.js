// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {
    logoutUser,
    selectUserId,
    selectUsername,
} from '../../../redux/slices/authSlice';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    paper: {
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '-10px',
            right: '18px',
            borderBottom: '5px solid white',
            borderRight: '5px solid transparent',
            borderLeft: '5px solid transparent',
            borderTop: '5px solid transparent',
            zIndex: '10',
        },
        position: 'absolute',
        top: theme.spacing(10),
        right: theme.spacing(3),
    },
    padding: {
        padding: theme.spacing(2),
    },
}));

function ProfilePopup() {
    // Use Material UI Styles
    const classes = useStyles();

    // React Handles
    const [userFullName, setUserFullName] = useState('');

    // Redux Handles
    const userId = useSelector(selectUserId);
    const username = useSelector(selectUsername);
    const dispatch = useDispatch();

    // Grab User's Full Name
    useEffect(() => {
        axios
            .post('/api/users/getUserFullName', { userId })
            .then((response) => {
                const fullName = response.data;

                setUserFullName(fullName);
            })
            .catch((err) => console.error(err));
    }, [userId]);

    // Handle Logout
    function handleLogout() {
        dispatch(logoutUser());
    }

    return (
        <Paper className={classes.paper}>
            <Box className={classes.padding}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar />
                    </Grid>
                    <Grid item>
                        <Typography>{userFullName}</Typography>
                        <Typography>@{username}</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            <Box className={classes.padding}>
                <Button fullWidth onClick={handleLogout}>
                    Sign out
                </Button>
            </Box>
        </Paper>
    );
}

export default ProfilePopup;
