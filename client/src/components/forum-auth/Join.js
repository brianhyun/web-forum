// Dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectFormErrors } from '../../redux/slices/errorsSlice';
import { resetFormErrors } from '../../redux/slices/errorsSlice';
import { joinForum } from '../../redux/slices/forumAuthSlice';
import { resetPrivacyStatus } from '../../redux/slices/forumAuthSlice';
import { selectPasswordExists } from '../../redux/slices/forumAuthSlice';

// Material UI Styles
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

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
    submit: {
        margin: theme.spacing(3, 0),
        padding: theme.spacing(2, 0),
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
    const passwordExists = useSelector(selectPasswordExists);
    const formErrors = useSelector(selectFormErrors);

    // React Handles
    const [forum, setForum] = useState({
        name: '',
        password: '',
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
        };

        // Dispatch Join Forum Action
        dispatch(joinForum(forumData, props.history));
    }

    // Reset Form Errors and 'passwordExists' State on Component Mount
    useEffect(() => {
        dispatch(resetFormErrors());
        dispatch(resetPrivacyStatus());
    }, []);

    return (
        <Box component="main" className={classes.root}>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box className={classes.box}>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Join a Forum
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                variant="outlined"
                                name="name"
                                required
                                fullWidth
                                label="Forum Name"
                                id="name"
                                margin="normal"
                                autoFocus
                                onChange={handleChange}
                                value={forum.name}
                                error={formErrors.name ? true : false}
                                helperText={
                                    formErrors.name ? formErrors.name : null
                                }
                            />
                            {passwordExists && (
                                <TextField
                                    variant="outlined"
                                    name="password"
                                    required
                                    fullWidth
                                    label="Password"
                                    id="password"
                                    type="password"
                                    margin="normal"
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Join
                            </Button>
                            <Grid container justify="center">
                                <Grid item>
                                    <Link to="/create" style={linkStyle}>
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                        >
                                            Create a Forum
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
