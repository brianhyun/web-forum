import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';

// Material UI Styles
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../tags/Copyright';

const useStyles = makeStyles((theme) => ({
    paper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
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
    // Use Material Styles
    const classes = useStyles();

    // Redux Handles
    const dispatch = useDispatch();

    // React Declaration
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
        // Prevent Default Form Behavior
        event.preventDefault();

        // Create User Object
        const userObj = {
            username: user.username,
            password: user.password,
        };

        dispatch(loginUser(userObj, props.history));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
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
                                <Typography variant="body2" color="primary">
                                    Forgot password?
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup" style={linkStyle}>
                                <Typography variant="body2" color="primary">
                                    Don't have an account? Sign Up
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
