// Dependencies
import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// Custom Styles and Modules
import './CreateComment.css';
import DOMPurify from '../../../utils/domPurifyConfig';

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
        justifyContent: 'flex-end',
    },
}));

function CreateComment(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // Handle New Post Input
    const [commentContent, setCommentContent] = useState('');

    // Handle Form Submit
    function handleFormSubmit(event) {
        event.preventDefault();

        const purifiedCommentContent = DOMPurify.sanitize(commentContent);

        axios
            .post('/api/posts/addComment', {
                content: purifiedCommentContent,
                postId: props.postId,
            })
            .then(() => {
                // Update Comments List
                props.updatePostCommentsAndNumOfComments();
            })
            .catch((err) => console.error(err));

        // Reset Form Handles
        setCommentContent('');
    }

    return (
        <Grid item xs={12}>
            <Paper className={clsx(classes.paper, classes.margin)}>
                <form noValidate onSubmit={handleFormSubmit}>
                    <ReactQuill
                        className={classes.margin}
                        theme="snow"
                        value={commentContent}
                        onChange={setCommentContent}
                        placeholder="Leave a comment..."
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
            </Paper>
        </Grid>
    );
}

export default CreateComment;
