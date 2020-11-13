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

import { addNewPost } from '../../redux/slices/postSlice';
import { getForumPosts } from '../../redux/slices/postSlice';

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
    marginBottom: {
        marginBottom: theme.spacing(3),
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
    // Load Forum-Specific Information on Component Mount
    const [currentForumId, setCurrentForumId] = useState('');

    const usersForums = JSON.parse(localStorage.getItem('usersForums'));

    useEffect(() => {
        // Grab Forum-Specific Information for Main Content Portion
        const currentPath = props.location.pathname;

        // Payload
        const data = {};

        if (currentPath === '/dashboard') {
            if (usersForums.length !== 0) {
                // If user is on the dashboard page and they are a part of one or more forums, then display contents of first forum.
                const firstForumId = usersForums[0].id;
                setCurrentForumId(firstForumId);

                data.forumId = firstForumId;

                dispatch(getForumInfo(data));
            } else {
                /*
					If user is on the dashboard page and they aren't a part of any forums, then display the join forums jumbotron.
				*/
            }
        } else {
            // If user is on a forum-specific page, then display contents of forum.
            const specificForumId = currentPath.split('/')[2];
            setCurrentForumId(specificForumId);

            data.forumId = specificForumId;

            dispatch(getForumInfo(data));
        }
    }, []);

    // useEffect(() => {
    // 	dispatch(getForumPosts(forumId));
    // }, []);

    // Handle New Post Input
    const [postContent, setPostContent] = useState('');
    const [postTitle, setPostTitle] = useState('');

    function handleTitleChange(event) {
        setPostTitle(event.target.value);
    }

    // Handle Form Submit
    function handleFormSubmit(event) {
        event.preventDefault();

        const newPost = {
            title: postTitle,
            content: postContent,
            forumId: currentForumId,
        };

        dispatch(addNewPost(newPost));
    }

    // Open and Close Navigation Drawer
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
                        {currentForum.name}
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
                        const forumLink = `/forum/${forum.id}`;
                        const forumName = forum.name;

                        return (
                            <Link to={forumLink} key={forum.id}>
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

            {/* Main Content Section */}
            <Box component="main" className={classes.content}>
                <div className={classes.toolbar} />

                <Grid container spacing={3}>
                    {/* Create New Post */}
                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper}>
                            <Typography
                                variant="h6"
                                className={classes.marginBottom}
                            >
                                Create New Post
                            </Typography>
                            <form noValidate onSubmit={handleFormSubmit}>
                                <TextField
                                    className={classes.marginBottom}
                                    id="outlined-basic"
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    value={postTitle}
                                    onChange={handleTitleChange}
                                    required
                                />
                                <ReactQuill
                                    className={classes.marginBottom}
                                    theme="snow"
                                    value={postContent}
                                    onChange={setPostContent}
                                    placeholder="Create a post..."
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Post
                                </Button>
                            </form>
                        </Paper>
                    </Grid>

                    {/* Sidebar - Miscellaneous Information */}
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6">Members</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Dashboard;
