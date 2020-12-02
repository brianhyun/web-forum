// Dependencies
import React from 'react';
import moment from 'moment';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

const useStyles = makeStyles((theme) => ({
    post: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    postInfoMargin: {
        marginBottom: theme.spacing(2),
    },
    postInfoText: {
        color: 'gray',
        fontSize: '14px',
    },
    titleMargin: {
        marginBottom: theme.spacing(1),
    },
    iconStyle: {
        fontSize: 20,
        marginRight: theme.spacing(1),
        color: 'gray',
    },
    comments: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: theme.spacing(4),
    },
}));

function Post(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // React Implementation of Setting Inner HTML
    const contentMarkup = {
        __html: props.content,
    };

    // Published Date Difference
    const dateDifference = moment(props.publishDate).fromNow();

    return (
        <Grid item xs={12}>
            <Paper className={classes.post}>
                <Box className={classes.postInfoMargin}>
                    <Typography
                        variant="body1"
                        className={classes.postInfoText}
                    >
                        {props.parentForumName} • Posted by {props.author}{' '}
                        {dateDifference}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" className={classes.titleMargin}>
                        {props.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="div"
                        dangerouslySetInnerHTML={contentMarkup}
                    ></Typography>
                </Box>
                <Box>
                    <Box className={classes.comments}>
                        <ModeCommentIcon className={classes.iconStyle} />{' '}
                        {props.comments.length}
                    </Box>
                </Box>
            </Paper>
        </Grid>
    );
}

export default Post;
