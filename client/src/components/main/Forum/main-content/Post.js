// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
    post: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    linkStyle: {
        textDecoration: 'none',
    },
    postInfoBox: {
        marginBottom: theme.spacing(2),
    },
    postInfoText: {
        color: 'gray',
        fontSize: '14px',
    },
    title: {
        marginBottom: theme.spacing(1),
    },
}));

function Post(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // React Implementation of Setting Inner HTML
    const contentMarkup = {
        __html: props.content,
    };

    const dateDifference = moment(props.publishDate).fromNow();

    const postLink = `/post/${props.postId}`;

    return (
        <Paper className={classes.post}>
            <Grid container>
                <Grid item xs={12}>
                    <Box className={classes.postInfoBox}>
                        <Typography
                            variant="body1"
                            className={classes.postInfoText}
                        >
                            {props.parentForumName} • Posted by {props.author}{' '}
                            {dateDifference}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" className={classes.title}>
                            {props.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            component="div"
                            dangerouslySetInnerHTML={contentMarkup}
                        ></Typography>
                    </Box>
                    <Box>
                        <Link to={postLink} className={classes.linkStyle}>
                            <Button>
                                <CommentIcon /> {props.comments.length} comments
                            </Button>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Post;
