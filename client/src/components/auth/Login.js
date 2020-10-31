// Dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { selectFormErrors } from '../../redux/slices/errorsSlice';
import { resetFormErrors } from '../../redux/slices/errorsSlice';

// Material UI Styles
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

function Login(props) {
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const dispatch = useDispatch();
    const formErrors = useSelector(selectFormErrors);

    // React Handles
    const [user, setUser] = useState({
        username: '',
        password: '',
        errors: {},
    });

    function handleChange(event) {
        setUser({
            ...user,
            [event.target.id]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const userObj = {
            username: user.username,
            password: user.password,
        };

        dispatch(loginUser(userObj, props.history));
    }

    // Reset Form Errors on Component Mount to Prevent Error Message Bleeding
    useEffect(() => {
        dispatch(resetFormErrors());
    }, []);

    return (
        <Box component="main" className={classes.root}>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box className={classes.box}>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                id="username"
                                autoFocus
                                onChange={handleChange}
                                value={user.username}
                                error={formErrors.username ? true : false}
                                helperText={
                                    formErrors.username
                                        ? formErrors.username
                                        : null
                                }
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                                value={user.password}
                                error={formErrors.password ? true : false}
                                helperText={
                                    formErrors.password
                                        ? formErrors.password
                                        : null
                                }
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="#" style={linkStyle}>
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                        >
                                            Forgot password?
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/signup" style={linkStyle}>
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                        >
                                            Don't have an account? Sign Up
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

export default Login;
