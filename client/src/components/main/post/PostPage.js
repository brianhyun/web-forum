// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Custom React Components
import Post from '../forum/main-content/Post';
import AppBarAndDrawer from '../forum/AppBarAndDrawer';
import MembersPanel from '../forum/sidebar/MembersPanel';

import { usePostId } from '../../../utils/customHooks';

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

function PostPage() {
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const postId = usePostId();

    // React Handles
    const [post, setPost] = useState();
    const [parentForumId, setParentForumId] = useState();

    useEffect(() => {
        axios
            .post('/api/posts/getPostInfo', { postId })
            .then((response) => {
                const postData = response.data;
                const postParentForumId = postData.parentForum._id;

                setParentForumId(postParentForumId);
                setPost(postData);
            })
            .catch((err) => console.error(err));
    }, [postId]);

    return (
        <Box className={classes.root}>
            <CssBaseline />
            <AppBarAndDrawer forumId={parentForumId} />

            <Box component="main" className={classes.content}>
                <div className={classes.toolbar} />

                <Grid container spacing={3}>
                    <Grid item container xs={12} sm={8}>
                        {post && (
                            <Post
                                postId={post._id}
                                title={post.title}
                                content={post.content}
                                author={post.author.name}
                                authorId={post.author._id}
                                publishDate={post.date}
                            />
                        )}
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <MembersPanel forumId={parentForumId} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default PostPage;
