// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
}));

function MembersPanel(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // React Handles
    const [forumMembers, setForumMembers] = useState([]);

    useEffect(() => {
        const forumId = props.forumId;

        axios
            .post('/api/forums/getForumMembers', { forumId })
            .then((response) => {
                const forumMembers = response.data;

                setForumMembers(forumMembers);
            })
            .catch((err) => console.error(err));
    }, [props.forumId]);

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6">Members</Typography>
            {forumMembers &&
                forumMembers.map((member) => {
                    return (
                        <Typography variant="body1" key={member._id}>
                            {member.name}
                        </Typography>
                    );
                })}
        </Paper>
    );
}

export default MembersPanel;
