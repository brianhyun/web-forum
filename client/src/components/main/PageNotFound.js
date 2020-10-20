import React from 'react';

// Material UI Styles
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

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
}));

function PageNotFound() {
    // Use Material UI Styles
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
                            Page Not Found
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default PageNotFound;
