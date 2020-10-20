import React from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';

// Material UI Styles
import Button from '@material-ui/core/Button';

function Dashboard(props) {
    // Redux Handles
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(logoutUser(props.history));
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={handleClick}>Log Out</Button>
        </div>
    );
}

export default Dashboard;
