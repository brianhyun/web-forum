// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Custom React Components
import Post from '../forum/main-content/Post';
import AppBarAndDrawer from '../forum/AppBarAndDrawer';
import MembersPanel from '../forum/sidebar/MembersPanel';

import { useForumId } from '../../../utils/customHooks';
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

    // The reason why forumId doesn't work is because the useForumId()
    // hook uses the url as a source of truth.
    // But, PostPage forum is only loaded on a '/post/:id' url.

    const forumId = useForumId();
    const postId = usePostId();

    // React Handles
    const [post, setPost] = useState();

    useEffect(() => {
        axios
            .post('/api/posts/getPostInfo', { postId })
            .then((response) => {
                const postData = response.data;

                setPost(postData);
            })
            .catch((err) => console.error(err));
    }, [postId]);

    return (
        <Box className={classes.root}>
            <CssBaseline />
            <AppBarAndDrawer forumId={forumId} />

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
                        <MembersPanel forumId={forumId} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default PostPage;
