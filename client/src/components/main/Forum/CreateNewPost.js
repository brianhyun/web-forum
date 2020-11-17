// Dependencies
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { selectUserId } from '../../../redux/slices/authSlice';

import { addNewPost } from '../../../redux/slices/postSlice';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Custom Styles
import './CreateNewPost.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
    marginBottom: {
        marginBottom: theme.spacing(3),
    },
}));

function CreateNewPost(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);

    // React Functions
    const [currentForumId, setCurrentForumId] = useState('');

    useEffect(() => {
        const currentPath = props.reactRouterProps.location.pathname;
        const forumId = currentPath.split('/')[2];
        setCurrentForumId(forumId);
    }, [props.reactRouterProps.location.pathname]);

    // Handle New Post Input
    const [postContent, setPostContent] = useState('');
    const [postTitle, setPostTitle] = useState('');

    function handleTitleChange(event) {
        setPostTitle(event.target.value);
    }

    // Handle Form Submit
    function handleFormSubmit(event) {
        event.preventDefault();

        const newPost = {
            title: postTitle,
            content: postContent,
            authorId: userId,
            forumId: currentForumId,
        };

        dispatch(addNewPost(newPost));

        // Reset Form Fields
        setPostContent('');
        setPostTitle('');
    }

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.marginBottom}>
                    Create New Post
                </Typography>
                <form noValidate onSubmit={handleFormSubmit}>
                    <TextField
                        className={classes.marginBottom}
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={postTitle}
                        onChange={handleTitleChange}
                        required
                    />
                    <ReactQuill
                        className={classes.marginBottom}
                        theme="snow"
                        value={postContent}
                        onChange={setPostContent}
                        placeholder="Create a post..."
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Post
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
}

export default CreateNewPost;
