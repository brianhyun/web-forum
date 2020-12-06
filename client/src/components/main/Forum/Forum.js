// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// React Components
import CreatePost from './main-content/CreatePost';
import AppBarAndDrawer from './AppBarAndDrawer';
import PostsList from './main-content/PostsList';
import MembersPanel from './sidebar/MembersPanel';

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
        // required to have main content below toolbar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(5, 3, 3, 3),
    },
    paper: {
        padding: theme.spacing(3),
    },
}));

function Forum() {
    // Use Material UI Styles
    const classes = useStyles();

    // React Handles
    const forumId = useForumId();
    const [forumPosts, setForumPosts] = useState(null);

    useEffect(() => {
        axios
            .post('/api/forums/getForumPosts', { forumId })
            .then((response) => {
                const forumPosts = response.data;

                setForumPosts(forumPosts);
            })
            .catch((err) => console.error(err));
    }, [forumId]);

    function updateForumPosts() {
        axios
            .post('/api/forums/getForumPosts', { forumId })
            .then((response) => {
                const forumPosts = response.data;

                setForumPosts(forumPosts);
            })
            .catch((err) => console.error(err));
    }

    return (
        <Box className={classes.root}>
            <CssBaseline />
            {forumId && <AppBarAndDrawer forumId={forumId} />}

            <Box component="main" className={classes.content}>
                <div className={classes.toolbar} />

                <Grid container spacing={3}>
                    <Grid item container xs={12} sm={8}>
                        {forumId && (
                            <CreatePost
                                forumId={forumId}
                                updateForumPosts={updateForumPosts}
                            />
                        )}

                        {forumPosts && <PostsList forumPosts={forumPosts} />}
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        {forumId && <MembersPanel forumId={forumId} />}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Forum;
