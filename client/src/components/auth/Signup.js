import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';

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

function Signup(props) {
    // Use Material Styles
    const classes = useStyles();

    // Redux Handles
    const dispatch = useDispatch();

    // React State Declaration
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        errors: {},
    });

    function handleChange(event) {
        // Update User Object
        setUser({
            ...user,
            [event.target.id]: event.target.value,
        });
    }

    function handleSubmit(event) {
        // Prevent Default Form Behavior
        event.preventDefault();

        // Create New User Object
        const newUser = {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            password2: user.password2,
        };

        dispatch(registerUser(newUser, props.history));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
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
                        label="Name"
                        id="name"
                        margin="normal"
                        autoFocus
                        onChange={handleChange}
                        value={user.name}
                    />
                    <TextField
                        variant="outlined"
                        name="username"
                        required
                        fullWidth
                        label="Username"
                        id="username"
                        margin="normal"
                        onChange={handleChange}
                        value={user.username}
                    />
                    <TextField
                        variant="outlined"
                        name="email"
                        required
                        fullWidth
                        label="Email Address"
                        id="email"
                        margin="normal"
                        onChange={handleChange}
                        value={user.email}
                    />
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
                        value={user.password}
                    />
                    <TextField
                        variant="outlined"
                        name="password2"
                        required
                        fullWidth
                        label="Verify Password"
                        id="password2"
                        type="password"
                        margin="normal"
                        onChange={handleChange}
                        value={user.password2}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link to="/login" style={linkStyle}>
                                <Typography variant="body2" color="primary">
                                    Already have an account? Log in
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </div>
        </Container>
    );
}

export default Signup;
