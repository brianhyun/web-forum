// Dependencies
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

// Redux
import { useSelector } from 'react-redux';

import { selectUserId } from '../../../../redux/slices/authSlice';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';
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
    marginBottom: {
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
    const [showCreatePost, setShowCreatePost] = useState(false);

    function handleTitleChange(event) {
        setPostTitle(event.target.value);
    }

    // Handle Form Submit
    function handleFormSubmit(event) {
        event.preventDefault();

        axios
            .post('/api/posts/create', {
                title: postTitle,
                content: postContent,
                authorId: userId,
                forumId: props.forumId,
            })
            .catch((err) => console.error(err));

        // Reset Form Fields
        setPostContent('');
        setPostTitle('');
    }

    function toggleShowCreatePost() {
        setShowCreatePost(!showCreatePost);
    }

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                {showCreatePost ? (
                    <Box>
                        <Typography
                            variant="h6"
                            className={classes.marginBottom}
                        >
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
                        </form>
                    </Box>
                ) : (
                    <TextField
                        label="Create new post"
                        fullWidth
                        onClick={toggleShowCreatePost}
                        variant="outlined"
                    />
                )}
            </Paper>
        </Grid>
    );
}

export default CreateNewPost;
