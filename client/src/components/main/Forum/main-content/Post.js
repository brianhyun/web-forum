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
    card: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    postInfoBox: {
        marginBottom: theme.spacing(2),
    },
    postInfoText: {
        color: 'gray',
        fontSize: '14px',
    },
    postContentBox: {},
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

    return (
        <Paper className={classes.card}>
            <Grid container>
                <Grid item xs={12}>
                    <Box className={classes.postInfoBox}>
                        <Typography
                            variant="body1"
                            className={classes.postInfoText}
                        >
                            Posted by {props.author} {dateDifference}
                        </Typography>
                    </Box>
                    <Box className={classes.postContent}>
                        <Typography variant="h5" className={classes.title}>
                            {props.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            component="div"
                            dangerouslySetInnerHTML={contentMarkup}
                        ></Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Post;
