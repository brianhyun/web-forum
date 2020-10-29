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

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = validateJoinInput;
