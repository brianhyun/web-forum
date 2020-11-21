// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Post from './Post';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
    noPosts: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '10vh',
        marginTop: theme.spacing(3),
    },
    noPostsContent: {
        fontWeight: '500',
        color: 'gray',
    },
}));

function PostsList(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // React Handles
    const [forumPosts, setForumPosts] = useState([]);

    useEffect(() => {
        const forumId = props.forumId;

        axios
            .post('/api/forums/getForumPosts', { forumId })
            .then((response) => {
                const forumPosts = response.data;

                setForumPosts(forumPosts);
            })
            .catch((err) => console.error(err));
    }, [props.forumId]);

    return (
        <Grid item xs={12}>
            {forumPosts && forumPosts.length ? (
                forumPosts.map((post) => {
                    return (
                        <Post
                            title={post.title}
                            content={post.content}
                            author={post.author.name}
                            authorId={post.author._id}
                            key={post._id}
                        />
                    );
                })
            ) : (
                <Paper className={classes.noPosts}>
                    <Typography
                        variant="body1"
                        className={classes.noPostsContent}
                    >
                        *tumbleweeds passing through the digital horizon*
                    </Typography>
                </Paper>
            )}
        </Grid>
    );
}

export default PostsList;
