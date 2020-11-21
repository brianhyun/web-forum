// Dependencies
import React from 'react';

// Custom React Components
import CreateNewPost from './CreateNewPost';
import AppBarAndDrawer from './AppBarAndDrawer';
import PostsList from './PostsList';
import MembersPanel from './Sidebar/MembersPanel';

import { useForumId } from '../../../utils/customHooks';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
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
    const forumId = useForumId();

    return (
        <Box className={classes.root}>
            <CssBaseline />
            <AppBarAndDrawer forumId={forumId} />

            <Box component="main" className={classes.content}>
                <div className={classes.toolbar} />

                <Grid container spacing={3}>
                    <Grid item container xs={12} sm={8}>
                        <CreateNewPost
                            reactRouterProps={props}
                            forumId={forumId}
                        />

                        <PostsList forumId={forumId} />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <MembersPanel forumId={forumId} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Forum;
