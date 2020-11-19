// Dependencies
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

import { selectCurrentForum } from '../../../../redux/slices/forumSlice';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
}));

function MembersPanel() {
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const currentForum = useSelector(selectCurrentForum);

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6">Members</Typography>
        </Paper>
    );
}

export default MembersPanel;
