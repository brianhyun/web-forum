// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// React Components
import Post from './Post';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    noPosts: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3),
    },
    noPostsText: {
        fontWeight: '500',
        color: 'gray',
    },
    linkStyle: {
        textDecoration: 'none',
    },
}));

function PostsList(props) {
    // Use Material UI Styles
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            {props.forumPosts && props.forumPosts.length ? (
                props.forumPosts.map((post) => {
                    const postLink = `/post/${post._id}`;

                    return (
                        <Link
                            to={postLink}
                            className={classes.linkStyle}
                            key={post._id}
                        >
                            <Post
                                parentForumId={post.parentForum._id}
                                parentForumName={post.parentForum.name}
                                postId={post._id}
                                title={post.title}
                                content={post.content}
                                author={post.author.name}
                                authorId={post.author._id}
                                publishDate={post.date}
                                numOfComments={post.comments.length}
                            />
                        </Link>
                    );
                })
            ) : (
                <Paper className={classes.noPosts}>
                    <Typography variant="body1" className={classes.noPostsText}>
                        *tumbleweeds passing through the digital horizon*
                    </Typography>
                </Paper>
            )}
        </Grid>
    );
}

export default PostsList;
