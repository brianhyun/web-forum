// Dependencies
import React from 'react';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    post: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    content: {},
}));

function Post(props) {
    // Use Material UI Styles
    const classes = useStyles();

    const contentMarkup = {
        __html: props.content,
    };

    return (
        <Paper className={classes.post}>
            <Typography variant="h5" className={classes.title}>
                {props.title}
            </Typography>
            <Typography
                variant="body1"
                component="div"
                dangerouslySetInnerHTML={contentMarkup}
                className={classes.content}
            ></Typography>
            <Typography variant="body1" className={classes.content}>
                Written by {props.author}, {props.authorId}
            </Typography>
        </Paper>
    );
}

export default Post;
