const isEmpty = require('is-empty');

const User = require('../User');

async function emailOrUsernameExists(input) {
    const email = input.email;
    const username = input.username;
    let errors = {};

    await User.findOne({ email })
        .then((user) => {
            if (user) {
                errors.email = 'Email address is already in use.';
            }
        })
        .then(() => {
            return User.findOne({ username });
        })
        .then((user) => {
            if (user) {
                errors.username = 'That username is already taken.';
            }
        })
        .catch((err) => console.error(err));

    return {
        errors,
        itExists: !isEmpty(errors),
    };
}

module.exports = emailOrUsernameExists;
