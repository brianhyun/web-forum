// Dependencies
import axios from 'axios';

// Set Users Forums in Local Storage
async function setUsersForumsInLocalStorage(userData) {
    try {
        // Get Users Forums
        const response = await axios.post(
            '/api/forums/getUsersForums',
            userData
        );

        // Stringify Data and Save to Local Storage
        const usersForums = response.data;
        localStorage.setItem('usersForums', JSON.stringify(usersForums));
    } catch (err) {
        console.error(err);
    }
}

export default setUsersForumsInLocalStorage;
