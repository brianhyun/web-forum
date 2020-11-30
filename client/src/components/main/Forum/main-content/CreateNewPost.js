// Dependencies
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import DOMPurify from 'dompurify';

// Redux
import { useSelector } from 'react-redux';

import { selectUserId } from '../../../../redux/slices/authSlice';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

// Custom Styles
import './CreateNewPost.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
    margin: {
        marginBottom: theme.spacing(3),
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

function CreateNewPost(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const userId = useSelector(selectUserId);

    // Handle New Post Input
    const [postContent, setPostContent] = useState('');
    const [postTitle, setPostTitle] = useState('');

    function handleTitleChange(event) {
        setPostTitle(event.target.value);
    }

    // Handle Form Submit
    function handleFormSubmit(event) {
        event.preventDefault();

        const purifiedPostContent = DOMPurify.sanitize(postContent);

        axios
            .post('/api/posts/create', {
                title: postTitle,
                content: purifiedPostContent,
                authorId: userId,
                forumId: props.forumId,
            })
            .then(() => {
                // Update PostsList
                props.updateForumPosts();
            })
            .catch((err) => console.error(err));

        // Reset Form Fields
        setPostContent('');
        setPostTitle('');

        // Hide Create Post Form
        setShowCreatePost(false);
    }

    // Handle Form View Toggle
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [textFieldLabel, setTextFieldLabel] = useState('Create new post');
    const [
        disableToggleShowCreatePost,
        setDisableToggleShowCreatePost,
    ] = useState(false);

    useEffect(() => {
        if (showCreatePost) {
            setTextFieldLabel('Title');
        } else {
            setTextFieldLabel('Create new post');
        }
    }, [showCreatePost]);

    function toggleShowCreatePost() {
        setShowCreatePost(!showCreatePost);
        setDisableToggleShowCreatePost(!disableToggleShowCreatePost);
    }

    return (
        <Grid item xs={12}>
            <Paper className={clsx(classes.paper, classes.margin)}>
                <Box>
                    {showCreatePost && (
                        <Typography variant="h6" className={classes.margin}>
                            Create New Post
                        </Typography>
                    )}
                    <form noValidate onSubmit={handleFormSubmit}>
                        <TextField
                            className={clsx({
                                [classes.margin]: showCreatePost,
                            })}
                            id="outlined-basic"
                            label={textFieldLabel}
                            variant="outlined"
                            fullWidth
                            value={postTitle}
                            onChange={handleTitleChange}
                            onClick={
                                !disableToggleShowCreatePost
                                    ? toggleShowCreatePost
                                    : null
                            }
                            required
                        />
                        {showCreatePost && (
                            <ReactQuill
                                className={classes.margin}
                                theme="snow"
                                value={postContent}
                                onChange={setPostContent}
                                placeholder="Create a post..."
                            />
                        )}
                        {showCreatePost && (
                            <Box className={classes.buttonContainer}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Post
                                </Button>
                                <IconButton onClick={toggleShowCreatePost}>
                                    <ExpandLessIcon />
                                </IconButton>
                            </Box>
                        )}
                    </form>
                </Box>
            </Paper>
        </Grid>
    );
}

export default CreateNewPost;
