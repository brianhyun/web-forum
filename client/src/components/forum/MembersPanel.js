// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
    },
    margin: {
        marginTop: theme.spacing(2),
    },
}));

function MembersPanel(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // React Handles
    const forumId = props.forumId;
    const [forumMembers, setForumMembers] = useState(null);

    useEffect(() => {
        axios
            .post('/api/forums/getForumMembers', { forumId })
            .then((response) => {
                const forumMembers = response.data;

                setForumMembers([...forumMembers]);
            })
            .catch((err) => console.error(err));
    }, [forumId]);

    return (
        <Paper className={classes.paper}>
            <Typography variant="h6">Members</Typography>
            <Divider className={classes.margin} />
            {forumMembers &&
                forumMembers.map((member) => {
                    return (
                        <Typography
                            variant="body1"
                            key={member._id}
                            className={classes.margin}
                        >
                            {member.name}
                        </Typography>
                    );
                })}
        </Paper>
    );
}

export default MembersPanel;
