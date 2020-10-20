// Dependencies
import jwt_decode from 'jwt-decode';

// Redux
import { useDispatch } from 'react-redux';
import { setCurrentUser, logoutUser } from '../redux/slices/authSlice';

// Utilities
import setAuthToken from './setAuthToken';

function checkToken() {
    const dispatch = useDispatch();

    // Automatically Login User When JWT is Present in Local Storage
    if (localStorage.jwtToken) {
        // Retrieve JWT
        const token = localStorage.jwtToken;

        // Set Auth Header
        setAuthToken(token);

        // Decode JWT and Set Current User
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));

        // Grab Current Time in Milliseconds
        const currentTime = Date.now() / 1000;

        // Check if Token Expired
        if (decoded.exp < currentTime) {
            // Logout User
            dispatch(logoutUser());

            // Redirect to Login
            window.location.href = './login';
        }
    }
}

export default checkToken;
