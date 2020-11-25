import { createMuiTheme } from '@material-ui/core/styles';

// Set Baseline Typography
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#607fcc',
            main: '#29539b',
            dark: '#002b6c',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffc947',
            main: '#ff9800',
            dark: '#c66900',
            contrastText: '#fff',
        },
    },
    typography: {
        h1: {
            fontFamily: 'Poppins',
            fontSize: 93,
            fontWeight: 300,
            letterSpacing: -1.5,
        },
        h2: {
            fontFamily: 'Poppins',
            fontSize: 58,
            fontWeight: 300,
            letterSpacing: -0.5,
        },
        h3: {
            fontFamily: 'Poppins',
            fontSize: 46,
            fontWeight: 400,
            letterSpacing: 0,
        },
        h4: {
            fontFamily: 'Poppins',
            fontSize: 33,
            fontWeight: 400,
            letterSpacing: 0.25,
        },
        h5: {
            fontFamily: 'Poppins',
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 0,
        },
        h6: {
            fontFamily: 'Poppins',
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: 0.15,
        },
        subtitle1: {
            fontFamily: 'Poppins',
            fontSize: 15,
            fontWeight: 400,
            letterSpacing: 0.15,
        },
        subtitle2: {
            fontFamily: 'Poppins',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: 0.1,
        },
        body1: {
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: 0.5,
        },
        body2: {
            fontFamily: 'Roboto',
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: 0.25,
        },
        button: {
            fontFamily: 'Roboto',
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 1.25,
        },
        overline: {
            fontFamily: 'Roboto',
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: 1.5,
        },
        caption: {
            fontFamily: 'Roboto',
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: 0.4,
        },
    },
});

export default theme;
