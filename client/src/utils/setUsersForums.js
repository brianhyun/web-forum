// Dependencies
import axios from 'axios';

// Set Users Forums in Local Storage
async function setUsersForumsInLocalStorage(userData) {
    let resolved = await axios
        .post('/api/forums/getUsersForums', userData)
        .then((response) => {
            const usersForums = response.data;

            localStorage.setItem('usersForums', JSON.stringify(usersForums));
        })
        .catch((err) => console.error(err));

    return resolved;
}

export default setUsersForumsInLocalStorage;
