import { createMuiTheme } from '@material-ui/core/styles';

// Set Baseline Typography
const theme = createMuiTheme({
    typography: {
        h1: {
            fontFamily: 'Poppins',
            fontSize: 93,
        },
        h2: {
            fontFamily: 'Poppins',
            fontSize: 58,
        },
        h3: {
            fontFamily: 'Poppins',
            fontSize: 46,
        },
        h4: {
            fontFamily: 'Poppins',
            fontSize: 33,
        },
        h5: {
            fontFamily: 'Poppins',
            fontSize: 23,
        },
        h6: {
            fontFamily: 'Poppins',
            fontSize: 19,
        },
        subtitle1: {
            fontFamily: 'Poppins',
            fontSize: 15,
        },
        subtitle2: {
            fontFamily: 'Poppins',
            fontSize: 13,
        },
        body1: {
            fontFamily: 'Roboto',
            fontSize: 16,
        },
        body2: {
            fontFamily: 'Roboto',
            fontSize: 14,
        },
        button: {
            fontFamily: 'Roboto',
            fontSize: 14,
        },
        overline: {
            fontFamily: 'Roboto',
            fontSize: 10,
        },
        caption: {
            fontFamily: 'Roboto',
            fontSize: 12,
        },
    },
});

export default theme;
