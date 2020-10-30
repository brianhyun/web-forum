const validator = require('validator');
const isEmpty = require('is-empty');

function validateJoinInput(input) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    input.name = !isEmpty(input.name) ? input.name : '';

    // Name Checks
    if (validator.isEmpty(input.name)) {
        errors.name = 'Name field is required';
    }

    // If Password Field Exists
    if (input.password) {
        // Convert empty fields to an empty string so we can use validator functions
        input.password = !isEmpty(input.password) ? input.password : '';

        // Password Checks
        if (validator.isEmpty(input.password)) {
            errors.password = 'Password field is required';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = validateJoinInput;
