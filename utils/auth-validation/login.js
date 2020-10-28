const validator = require('validator');
const isEmpty = require('is-empty');

function validateLoginInput(input) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    input.username = !isEmpty(input.username) ? input.username : '';
    input.password = !isEmpty(input.password) ? input.password : '';

    // Username Checks
    if (validator.isEmpty(input.username)) {
        errors.username = 'Username field is required';
    }

    // Password Checks
    if (validator.isEmpty(input.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = validateLoginInput;
