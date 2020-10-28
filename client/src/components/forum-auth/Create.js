// Dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectFormErrors } from '../../redux/slices/errorsSlice';
import { resetFormErrors } from '../../redux/slices/errorsSlice';
import { createForum } from '../../redux/slices/forumAuthSlice';

// Material UI Styles
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#1E3B70',
    },
    box: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
    },
    paper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4, 3),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    toggle: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
    },
    submit: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2, 0),
    },
    margin: {
        marginBottom: theme.spacing(2),
    },
    gridItem: {
        paddingBottom: 0,
    },
}));

// Custom React Styles
const linkStyle = {
    textDecoration: 'none',
};

function Join(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const dispatch = useDispatch();
    const formErrors = useSelector(selectFormErrors);

    // React Handles
    const [forum, setForum] = useState({
        name: '',
        password: '',
        isPublic: true,
        errors: {},
    });

    function handleChange(event) {
        setForum({
            ...forum,
            [event.target.id]: event.target.value,
        });
    }

    function handleSubmit(event) {
        // Prevent Default Form Behavior
        event.preventDefault();

        // Create Forum Object
        const forumData = {
            name: forum.name,
            isPublic: forum.isPublic,
        };

        if (!forum.isPublic) {
            forumData.password = forum.password;
        }

        // Dispatch Login Forum Action
        dispatch(createForum(forumData, props.history));
    }

    function changePrivacyStatus(event) {
        let isPublic = null;
        if (event.currentTarget.value === 'true') {
            isPublic = true;
        } else if (event.currentTarget.value === 'false') {
            isPublic = false;
        }

        setForum({
            ...forum,
            isPublic: isPublic,
        });

        // Reset Form Errors
        dispatch(resetFormErrors());
    }

    return (
        <Box component="main" className={classes.root}>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box className={classes.box}>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Create a Forum
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                className={classes.margin}
                                variant="outlined"
                                name="name"
                                required
                                fullWidth
                                label="Forum Name"
                                id="name"
                                autoFocus
                                onChange={handleChange}
                                value={forum.name}
                                error={formErrors.name ? true : false}
                                helperText={
                                    formErrors.name ? formErrors.name : null
                                }
                            />
                            {!forum.isPublic && (
                                <TextField
                                    className={classes.margin}
                                    variant="outlined"
                                    name="password"
                                    required
                                    fullWidth
                                    label="Password"
                                    id="password"
                                    type="password"
                                    onChange={handleChange}
                                    value={forum.password}
                                    error={formErrors.password ? true : false}
                                    helperText={
                                        formErrors.password
                                            ? formErrors.password
                                            : null
                                    }
                                />
                            )}
                            <Grid
                                container
                                spacing={2}
                                className={classes.toggle}
                            >
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        onClick={changePrivacyStatus}
                                        variant={
                                            forum.isPublic
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        color={
                                            forum.isPublic
                                                ? 'secondary'
                                                : 'default'
                                        }
                                        value="true"
                                    >
                                        Public
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        onClick={changePrivacyStatus}
                                        variant={
                                            !forum.isPublic
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        color={
                                            !forum.isPublic
                                                ? 'secondary'
                                                : 'default'
                                        }
                                        value="false"
                                    >
                                        Private
                                    </Button>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Create
                            </Button>
                            <Grid container justify="center">
                                <Grid item>
                                    <Link to="/join" style={linkStyle}>
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                        >
                                            Join a Forum
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}

export default Join;
