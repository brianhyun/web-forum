// Dependencies
import React from 'react';
import moment from 'moment';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    comment: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    commentInfoMargin: {
        marginBottom: theme.spacing(2),
    },
    commentInfoText: {
        color: 'gray',
        fontSize: '14px',
    },
}));

function Comment(props) {
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
            <Paper className={classes.comment}>
                <Box className={classes.commentInfoMargin}>
                    <Typography
                        variant="body1"
                        className={classes.commentInfoText}
                    >
                        {props.author} • {dateDifference}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="body1"
                        component="div"
                        dangerouslySetInnerHTML={contentMarkup}
                    ></Typography>
                </Box>
            </Paper>
        </Grid>
    );
}

export default Comment;
