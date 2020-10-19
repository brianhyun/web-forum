import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import GroupWorkOutlinedIcon from '@material-ui/icons/GroupWorkOutlined';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#1E3B70',
        padding: theme.spacing(0, 10),
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    header: {
        color: '#ffffff',
        marginBottom: theme.spacing(3),
    },
    subtitle: {
        color: '#ffffff',
        fontSize: 20,
        marginBottom: theme.spacing(5),
    },
    login: {
        backgroundColor: '#ffffff',
        color: theme.palette.primary.main,
        padding: theme.spacing(1, 0),
    },
    signup: {
        borderColor: '#ffffff',
        color: '#ffffff',
        padding: theme.spacing(1, 0),
    },
}));

const linkStyle = {
    textDecoration: 'none',
    width: '100%',
};

function Landing() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xl" className={classes.container}>
            <CssBaseline />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Box className={classes.box}>
                        <Typography
                            variant="h4"
                            component="h1"
                            className={classes.header}
                        >
                            The Forum
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.subtitle}
                        >
                            A structured approach to the chaotic group chat.
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Link to="/login" style={linkStyle}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.login}
                                    >
                                        Log In
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Link to="/signup" style={linkStyle}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="outlined"
                                        className={classes.signup}
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Landing;
