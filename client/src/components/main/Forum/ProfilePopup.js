// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Redux
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../../redux/slices/authSlice';

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
    link: {
        color: 'black',
        textDecoration: 'none',
    },
}));

function ProfilePopup(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // React Handles
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        username: '',
    });

    // Redux Handles
    const dispatch = useDispatch();

    // Grab User Info
    useEffect(() => {
        axios
            .get('/api/users/getUsernameInfo')
            .then((response) => {
                setUserInfo({
                    ...response.data,
                });
            })
            .catch((err) => console.error(err));
    }, []);

    // Handle Logout
    function handleLogout() {
        dispatch(logoutUser());
    }

    return (
        <Paper
            className={classes.paper}
            style={{ visibility: props.showPopup ? 'visible' : 'hidden' }}
        >
            <Box className={classes.padding}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar />
                    </Grid>
                    <Grid item>
                        <Typography>{userInfo.fullName}</Typography>
                        <Typography>@{userInfo.username}</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            <Box className={classes.padding}>
                <Button fullWidth onClick={handleLogout}>
                    Log out
                </Button>
            </Box>
        </Paper>
    );
}

export default ProfilePopup;
