// Dependencies
import React from 'react';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
}));

function Post(props) {
    // Use Material UI Styles
    const classes = useStyles();

    return (
        <Box>
            <CssBaseline />

            <Paper className={classes.paper}></Paper>
        </Box>
    );
}

export default Post;
