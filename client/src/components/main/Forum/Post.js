// Dependencies
import React from 'react';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    post: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
}));

function Post(props) {
    // Use Material UI Styles
    const classes = useStyles();

    return (
        <Paper className={classes.post}>
            <Typography variant="h5">{props.title}</Typography>
            <Typography variant="body1">{props.content}</Typography>
        </Paper>
    );
}

export default Post;
