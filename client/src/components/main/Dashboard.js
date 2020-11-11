// Dependencies
import React, { useState, useEffect } from 'react';
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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Custom Styles
import './Dashboard.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
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
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(3),
    },
}));

function Dashboard(props) {
    // Use Material UI Styles
    const classes = useStyles();
    const theme = useTheme();

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

    // New Post Handling
    const [postContent, setPostContent] = useState('');

    function handleClick() {
        console.log(postContent);
    }

    // Open and Close Navigation Drawer
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box className={classes.root}>
            <CssBaseline />

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
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
                    <Typography variant="h6" noWrap>
                        {currentForum.name}
                    </Typography>
                    <Box>
                        <IconButton
                            disableRipple
                            disableFocusRipple
                            size="small"
                            onClick={handleClick}
                        >
                            <Avatar alt="forum profile picture" src="" />
                        </IconButton>
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
                    {/* All Forums */}
                    {usersForums.map((forum) => {
                        const forumLink = `/forum/${forum.id}`;
                        const forumName = forum.name;

                        return (
                            <Link to={forumLink}>
                                <ListItem button key={forum.id}>
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

            {/* Main Content Section */}
            <Box component="main" className={classes.content}>
                <div className={classes.toolbar} />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper}>
                            <TextField
                                id="outlined-basic"
                                label="Title"
                                variant="outlined"
                                fullWidth
                            />
                            <ReactQuill
                                theme="snow"
                                value={postContent}
                                onChange={setPostContent}
                                placeholder="Create a post..."
                            />
                            <Box className={classes.postButtonContainer}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClick}
                                >
                                    Post
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper}>Misc1</Paper>
                        <Paper className={classes.paper}>Misc2</Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Dashboard;
