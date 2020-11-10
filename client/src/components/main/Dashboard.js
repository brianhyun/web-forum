// Dependencies
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { logoutUser } from '../../redux/slices/authSlice';

import { getForumInfo } from '../../redux/slices/forumSlice';
import { selectCurrentForum } from '../../redux/slices/forumSlice';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 65;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    headingContainer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

function Dashboard(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const dispatch = useDispatch();
    const currentForum = useSelector(selectCurrentForum);

    // React Functions
    function handleClick() {
        dispatch(logoutUser());
    }

    // Load Forum-Specific Information on Component Mount
    const usersForums = JSON.parse(localStorage.getItem('usersForums'));

    useEffect(() => {
        // Grab Forum-Specific Information for Main Content Portion
        const currentPath = props.location.pathname;

        // Payload
        const data = {};

        if (currentPath === '/dashboard') {
            if (usersForums.length !== 0) {
                // If user is on the dashboard page, then display contents of first forum.
                const firstForumId = usersForums[0].id;

                data.forumId = firstForumId;

                dispatch(getForumInfo(data));
            }
        } else {
            // If user is on a forum-specific page, then display contents of forum.
            const specificForumId = currentPath.split('/')[2];

            data.forumId = specificForumId;

            dispatch(getForumInfo(data));
        }
    }, []);

    return (
        <Box className={classes.root}>
            <CssBaseline />

            {/* Navigation Menu */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <List>
                    {/* All Forums */}
                    {usersForums.map((forum) => {
                        const forumLink = `/forum/${forum.id}`;
                        const forumName = forum.name;

                        return (
                            <ListItem
                                key={forum.id}
                                className={classes.listItem}
                            >
                                <IconButton
                                    disableRipple
                                    disableFocusRipple
                                    size="small"
                                >
                                    <Link to={forumLink}>
                                        <Avatar alt={forumName} src="" />
                                    </Link>
                                </IconButton>
                            </ListItem>
                        );
                    })}

                    {/* Join/Create List Item */}
                    <ListItem className={classes.listItem}>
                        <IconButton
                            disableRipple
                            disableFocusRipple
                            size="small"
                        >
                            <Link to="/join">
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </Link>
                        </IconButton>
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content Section */}
            <Box component="main" className={classes.content}>
                <Box className={classes.headingContainer}>
                    <Typography>{currentForum.name}</Typography>
                    <IconButton
                        disableRipple
                        disableFocusRipple
                        size="small"
                        onClick={handleClick}
                    >
                        <Avatar alt="forum profile picture" src="" />
                    </IconButton>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper}>
                            <ReactQuill theme="snow" />
                        </Paper>
                    </Grid>
                    <Grid container item xs={12} sm={4} spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>Misc1</Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>Misc2</Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Dashboard;
