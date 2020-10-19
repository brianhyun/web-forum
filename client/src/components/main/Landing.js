import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    box: {
        background: 'linear-gradient(to bottom right, #29539B, #1E3B70)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        padding: theme.spacing(0, 10),
    },
    header: {
        color: '#ffffff',
        fontWeight: 500,
        marginBottom: theme.spacing(4),
    },
    subtitle: {
        color: '#ffffff',
        fontFamily: 'Roboto',
        fontSize: 28,
        marginBottom: theme.spacing(6),
    },
    login: {
        backgroundColor: '#ffffff',
        marginRight: theme.spacing(6),
        padding: theme.spacing(1.5, 8),
    },
    signup: {
        color: '#ffffff',
        borderColor: '#ffffff',
        padding: theme.spacing(1.5, 8),
    },
}));

const linkStyle = {
    textDecoration: 'none',
};

function Landing() {
    const classes = useStyles();

    return (
        <Box>
            <Box className={classes.box}>
                <Typography
                    variant="h2"
                    component="h1"
                    className={classes.header}
                >
                    The Forum
                </Typography>
                <Typography
                    variant="h4"
                    component="h2"
                    className={classes.subtitle}
                >
                    A structured approach to the chaotic group chat.
                </Typography>
                <Box>
                    <Link to="/login" style={linkStyle}>
                        <Button
                            variant="contained"
                            size="large"
                            className={classes.login}
                        >
                            Log In
                        </Button>
                    </Link>
                    <Link to="/signup" style={linkStyle}>
                        <Button
                            variant="outlined"
                            size="large"
                            className={classes.signup}
                        >
                            Sign Up
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default Landing;
