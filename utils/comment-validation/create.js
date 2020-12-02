const validator = require('validator');
const isEmpty = require('is-empty');

function validateCommentInput(input) {
    let errors = {};

    // Convert Empty Fields To Empty String to Use Validator Functions
    input.content = !isEmpty(input.content) ? input.content : '';

    // Content Checks
    if (validator.isEmpty(input.content)) {
        errors.content = 'Content field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = validateCommentInput;
