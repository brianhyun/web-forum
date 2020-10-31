// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';

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

    // React Functions
    function handleClick() {
        dispatch(logoutUser());
    }

    return (
        <Box className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <List>
                    <ListItem className={classes.listItem}>
                        <IconButton
                            disableRipple
                            disableFocusRipple
                            size="small"
                        >
                            <Avatar alt="forum profile picture" src="" />
                        </IconButton>
                    </ListItem>
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
