// Dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// React Components
import ProfilePopup from './ProfilePopup';

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
import GroupIcon from '@material-ui/icons/Group';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: theme.spacing(10),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarNav: {
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    appBarToolbar: {
        height: '100%',
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
        width: theme.spacing(9),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: theme.spacing(10),
    },
    paper: {
        padding: theme.spacing(3),
    },
    profileIcon: {
        position: 'relative',
    },
    link: {
        color: 'black',
        textDecoration: 'none',
    },
    listItem: {
        padding: theme.spacing(2),
    },
}));

function AppBarAndDrawer(props) {
    // Use Material UI Styles
    const classes = useStyles();
    const theme = useTheme();

    // React Handles
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Backend Call for Current Forum Name
    const [forumName, setForumName] = useState('');

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

    // Profile Popup
    const [profilePopupOpen, setProfilePopupOpen] = useState(false);

    function showProfilePopup() {
        setProfilePopupOpen(!profilePopupOpen);
    }

    return (
        <Box>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.appBarToolbar}>
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

                    <Typography variant="h6">
                        {forumName && forumName}
                    </Typography>

                    <Box className={classes.appBarNav}>
                        <Box>
                            <IconButton
                                disableRipple
                                disableFocusRipple
                                size="small"
                                className={classes.profileIcon}
                                onClick={showProfilePopup}
                            >
                                <Avatar alt="forum profile picture" src="" />
                            </IconButton>
                            {profilePopupOpen && <ProfilePopup />}
                        </Box>
                    </Box>
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
                    {usersForums.map((forum) => {
                        const forumLink = `/forum/${forum._id}`;
                        const forumName = forum.name;

                        return (
                            <Link
                                to={forumLink}
                                key={forum._id}
                                className={classes.link}
                            >
                                <ListItem button className={classes.listItem}>
                                    <ListItemAvatar>
                                        <Avatar alt={forumName} src="">
                                            <GroupIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={forumName} />
                                </ListItem>
                            </Link>
                        );
                    })}

                    <Link to="/join" className={classes.link}>
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
