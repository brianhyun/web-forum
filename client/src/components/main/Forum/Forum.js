// Dependencies
import React, { useEffect } from 'react';

// Custom React Components
import CreateNewPost from './CreateNewPost';
import AppBarAndDrawer from './AppBarAndDrawer';
import PostsList from './PostsList';

// Redux
import { useDispatch } from 'react-redux';

import { getForumInfo } from '../../../redux/slices/forumSlice';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        // Required to have main content below toolbar.
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(3),
    },
}));

function Forum(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const dispatch = useDispatch();

    // React Handles
    useEffect(() => {
        const currentPath = props.location.pathname;
        const forumId = currentPath.split('/')[2];

        dispatch(getForumInfo({ forumId }));
    }, [props.location.pathname]);

    return (
        <Box className={classes.root}>
            <CssBaseline />
            <AppBarAndDrawer />

            <Box component="main" className={classes.content}>
                <div className={classes.toolbar} />

                <Grid container spacing={3}>
                    <Grid item container xs={12} sm={8}>
                        <CreateNewPost reactRouterProps={props} />

                        <PostsList />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6">Members</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Forum;
