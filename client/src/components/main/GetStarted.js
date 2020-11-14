// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Material UI Styles
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
        height: '100vh',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    heading: {
        marginBottom: theme.spacing(1),
    },
    paper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
    },
    grid: {
        marginTop: theme.spacing(1),
    },
}));

// Custom React Styles
const linkStyle = {
    textDecoration: 'none',
};

function GetStarted() {
    // Use Material UI Styles
    const classes = useStyles();

    return (
        <Box component="main" className={classes.root}>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box className={classes.box}>
                    <Paper elevation={3} className={classes.paper}>
                        {/* Content */}
                        <Box className={classes.content}>
                            <Typography
                                component="h1"
                                variant="h5"
                                className={classes.heading}
                            >
                                Get Started!
                            </Typography>
                            <Typography component="h2" variant="body1">
                                To get started, join or create a forum.
                            </Typography>
                        </Box>

                        {/* Links */}
                        <Grid container spacing={2} className={classes.grid}>
                            <Grid item xs={12} sm={6}>
                                <Link to="/join" style={linkStyle}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Join
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Link to="/create" style={linkStyle}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                    >
                                        Create
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}

export default GetStarted;
