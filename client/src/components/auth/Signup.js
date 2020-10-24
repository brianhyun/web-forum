// Dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signupUser } from '../../redux/slices/authSlice';
import { selectFormErrors } from '../../redux/slices/errorsSlice';

// Material UI Styles
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
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
    // Use Material UI Styles
    const classes = useStyles();

    // Redux Handles
    const dispatch = useDispatch();
    const formErrors = useSelector(selectFormErrors);

    // React State Declaration
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
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

        dispatch(signupUser(newUser, props.history));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
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
                        error={formErrors.name ? true : false}
                        helperText={formErrors.name ? formErrors.name : null}
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
                        error={formErrors.username ? true : false}
                        helperText={
                            formErrors.username ? formErrors.username : null
                        }
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
                        error={formErrors.email ? true : false}
                        helperText={formErrors.email ? formErrors.email : null}
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
                        error={formErrors.password ? true : false}
                        helperText={
                            formErrors.password ? formErrors.password : null
                        }
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
                        error={formErrors.password2 ? true : false}
                        helperText={
                            formErrors.password2 ? formErrors.password2 : null
                        }
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
            </div>
        </Container>
    );
}

export default Signup;
