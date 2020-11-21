// Dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Redux
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../../redux/slices/authSlice';

// Material UI Styles
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
    },
    paper: {
        padding: theme.spacing(3),
    },
}));

function AppBarAndDrawer(props) {
    // Use Material UI Styles
    const classes = useStyles();
    const theme = useTheme();

    // Redux Handles
    const dispatch = useDispatch();

    // React Handles
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleLogout() {
        dispatch(logoutUser());
    }

    const [forumName, setForumName] = useState('');

    // Backend Call for Current Forum Name
    useEffect(() => {
        const forumId = props.forumId;

        axios
            .post('/api/forums/getForumName', { forumId })
            .then((response) => {
                const forumName = response.data;
                setForumName(forumName);
            })
            .catch((err) => console.error(err));
    }, [props.forumId]);

    // Grab User's Forums from Local Storage
    const usersForums = JSON.parse(localStorage.getItem('usersForums'));

    return (
        <Box>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    {/* Drawer Icon */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Forum Name */}
                    <Typography variant="h6" noWrap>
                        {forumName && forumName}
                    </Typography>

                    {/* Profile Icon */}
                    <IconButton
                        disableRipple
                        disableFocusRipple
                        size="small"
                        onClick={handleLogout}
                    >
                        <Avatar alt="forum profile picture" src="" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                {/* Toolbar Close Button */}
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>

                <Divider />

                <List>
                    {/* All Forums */}
                    {usersForums.map((forum) => {
                        const forumLink = `/forum/${forum._id}`;
                        const forumName = forum.name;

                        return (
                            <Link to={forumLink} key={forum._id}>
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar alt={forumName} src="" />
                                    </ListItemAvatar>
                                    <ListItemText primary={forumName} />
                                </ListItem>
                            </Link>
                        );
                    })}

                    <Divider />

                    {/* Add Forum */}
                    <Link to="/join">
                        <ListItem button className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Add Forum" />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </Box>
    );
}

export default AppBarAndDrawer;
