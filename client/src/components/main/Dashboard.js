// Dependencies
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { logoutUser } from '../../redux/slices/authSlice';
import { selectUserId } from '../../redux/slices/authSlice';

import { getUsersForums } from '../../redux/slices/forumSlice';
import { selectUsersForums } from '../../redux/slices/forumSlice';

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
    settingsPaper: {
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
}));

function Dashboard() {
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const usersForums = useSelector(selectUsersForums);

    // React Functions
    function handleClick() {
        dispatch(logoutUser());
    }

    // Load All Forums for a Specific User
    useEffect(() => {
        const userData = {
            userId: userId,
        };

        dispatch(getUsersForums(userData));
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
                            <ListItem className={classes.listItem}>
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
                <Paper className={classes.settingsPaper}>
                    <IconButton
                        disableRipple
                        disableFocusRipple
                        size="small"
                        onClick={handleClick}
                    >
                        <Avatar alt="forum profile picture" src="" />
                    </IconButton>
                </Paper>

                <Box component="section" className={classes.forum}></Box>
            </Box>
        </Box>
    );
}

export default Dashboard;
