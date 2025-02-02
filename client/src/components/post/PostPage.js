// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// React Components
import Post from '../forum/Post';
import AppBarAndDrawer from '../forum/AppBarAndDrawer';
import MembersPanel from '../forum/MembersPanel';
import CreateComment from './CreateComment';
import CommentsList from './CommentsList';

import { usePostId } from '../../utils/customHooks';

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

    // React Handles
    const postId = usePostId();
    const [post, setPost] = useState(null);
    const [parentForumId, setParentForumId] = useState(null);
    const [postComments, setPostComments] = useState(null);
    const [numOfComments, setNumOfComments] = useState(null);

    useEffect(() => {
        axios
            .post('/api/posts/getPostInfo', { postId })
            .then((response) => {
                const post = response.data;

                setPost(post);
                setNumOfComments(post.comments.length);
                setParentForumId(post.parentForum._id);
                setPostComments(post.comments);
            })
            .catch((err) => console.error(err));
    }, [postId]);

    function updatePostCommentsAndNumOfComments() {
        axios
            .post('/api/posts/getPostComments', { postId })
            .then((response) => {
                const post = response.data;

                setPostComments(post.comments);
                setNumOfComments(post.comments.length);
            })
            .catch((err) => console.error(err));
    }

    return (
        <Box className={classes.root}>
            <CssBaseline />
            {parentForumId && <AppBarAndDrawer forumId={parentForumId} />}

            <Box component="main" className={classes.content}>
                <div className={classes.toolbar} />

                <Grid container spacing={3}>
                    <Grid item container xs={12} sm={8}>
                        {post && numOfComments !== null && (
                            <Post
                                parentForumId={post.parentForum._id}
                                parentForumName={post.parentForum.name}
                                postId={post._id}
                                title={post.title}
                                content={post.content}
                                author={post.author.name}
                                authorId={post.author._id}
                                publishDate={post.date}
                                numOfComments={numOfComments}
                            />
                        )}

                        {postId && (
                            <CreateComment
                                postId={postId}
                                updatePostCommentsAndNumOfComments={
                                    updatePostCommentsAndNumOfComments
                                }
                            />
                        )}

                        {postComments && (
                            <CommentsList postComments={postComments} />
                        )}
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        {parentForumId && (
                            <MembersPanel forumId={parentForumId} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default PostPage;
