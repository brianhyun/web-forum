// Dependencies
import axios from 'axios';

// Set Users Forums in Local Storage
function setUsersForumsInLocalStorage(usersForums) {
    // Store Users Forums in Local Storage
    const stringifiedData = JSON.stringify(usersForums);

    localStorage.setItem('usersForums', stringifiedData);
}

// Get Users Forums from Database
async function getUsersForums(userData) {
    try {
        const response = await axios.post(
            '/api/forums/getUsersForums',
            userData
        );

        const usersForums = response.data;

        return usersForums;
    } catch (err) {
        console.error(err);
    }
}

// Consolidate Both Actions into One Function
async function storeUsersForumsInLocalStorage(userData) {
    try {
        const usersForums = await getUsersForums(userData);

        setUsersForumsInLocalStorage(usersForums);

        return usersForums;
    } catch (err) {
        console.error(err);
    }
}

export default storeUsersForumsInLocalStorage;
