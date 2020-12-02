// Dependencies
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import DOMPurify from 'dompurify';

// Redux
import { useSelector } from 'react-redux';

import { selectUserId } from '../../../redux/slices/authSlice';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// Custom Styles
import './CreateComment.css';

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

function CreateComment(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const userId = useSelector(selectUserId);

    // Handle New Post Input
    const [commentContent, setCommentContent] = useState('');

    // Handle Form Submit
    function handleFormSubmit(event) {
        event.preventDefault();

        const purifiedCommentContent = DOMPurify.sanitize(commentContent);

        axios
            .post('/api/posts/addComment', {
                content: purifiedCommentContent,
                authorId: userId,
                forumId: props.forumId,
            })
            .then((response) => {
                // Update Comments List
                // props.updatePostsComments();
            })
            .catch((err) => console.error(err));

        // Reset Form Handles
        setCommentContent('');
    }

    return (
        <Grid item xs={12}>
            <Paper className={clsx(classes.paper, classes.margin)}>
                <Box>
                    <Typography variant="h6" className={classes.margin}>
                        Comment
                    </Typography>
                    <form noValidate onSubmit={handleFormSubmit}>
                        <ReactQuill
                            className={classes.margin}
                            theme="snow"
                            value={commentContent}
                            onChange={setCommentContent}
                            placeholder="Create a post..."
                        />
                        <Box className={classes.buttonContainer}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Comment
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Grid>
    );
}

export default CreateComment;
