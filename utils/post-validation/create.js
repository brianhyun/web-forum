const validator = require('validator');
const isEmpty = require('is-empty');

function validatePostInput(input) {
    let errors = {};

    // Convert Empty Fields To Empty String to Use Validator Functions
    input.title = !isEmpty(input.title) ? input.title : '';
    input.content = !isEmpty(input.content) ? input.content : '';

    // Title Checks
    if (validator.isEmpty(input.title)) {
        errors.title = 'Title field is required';
    }

    // Content Checks
    if (validator.isEmpty(input.content)) {
        errors.content = 'Content field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = validatePostInput;
