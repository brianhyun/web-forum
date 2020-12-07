// Dependencies
import React from 'react';

// React Components
import Comment from './Comment';

// Material UI Components
import Grid from '@material-ui/core/Grid';

function CommentsList(props) {
    return (
        <Grid item xs={12}>
            {props.postComments.map((comment) => {
                return (
                    <Comment
                        content={comment.content}
                        author={comment.author.name}
                        authorId={comment.author._id}
                        publishDate={comment.date}
                        key={comment._id}
                    />
                );
            })}
        </Grid>
    );
}

export default CommentsList;
