// Dependencies
import React from 'react';

// Components
import Post from './Post';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
}));

function PostsList() {
    // Use Material UI Styles
    const classes = useStyles();

    return (
        <Box>
            <CssBaseline />
        </Box>
    );
}

export default PostsList;
