const validator = require('validator');
const passwordValidator = require('password-validator');
const isEmpty = require('is-empty');

const schema = new passwordValidator(); 

schema
    .is().min(8)
    .is().max(30)
    .has().uppercase()                              
    .has().lowercase()                             
    .has().digits(2)   
    .has().not().spaces()
    .has().symbols(1); 

function validateRegisterInput(input) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    input.name = !isEmpty(input.name) ? input.name : '';
    input.username = !isEmpty(input.username) ? input.username : '';
    input.email = !isEmpty(input.email) ? input.email : '';
    input.password = !isEmpty(input.password) ? input.password : '';
    input.password2 = !isEmpty(input.password2) ? input.password2 : '';

    // Name Checks
    if (validator.isEmpty(input.name)) {
        errors.name = 'First name field is required';
    }

    // Username Checks
    if (validator.isEmpty(input.username)) {
        errors.username = 'Username field is required';
    }

    // Email Checks
    if (validator.isEmpty(input.email)) {
        errors.email = 'Email field is required';
    } else if (!validator.isEmail(input.email)) {
        errors.email = 'Email is invalid';
    }

    // Password Checks
    if (validator.isEmpty(input.password)) {
        errors.password = 'Password field is required';
    }
    if (validator.isEmpty(input.password2)) {
        errors.password2 = 'Confirm password field is required';
    }
    if (!schema.validate(input.password)) {
        const errorList = schema.validate(input.password, { list: true });

        errorList.forEach((errorType) => {
            if (errorType === 'min') {
                errors.password = 'Password must be at least 8 characters';
            } else if (errorType === 'max') {
                errors.password = 'Password cannot exceed 30 characters';
            } else if (errorType === 'uppercase') {
                errors.password = 'Password must contain at least one uppercase letter';
            } else if (errorType === 'lowercase') {
                errors.password = 'Password must contain at least one lowercase letter';
            } else if (errorType === 'digits') {
                errors.password = 'Password must contain at least two digits';
            } else if (errorType === 'spaces') {
                errors.password = 'Password must not contain any spaces';
            } else if (errorType === 'symbols') {
                errors.password = 'Password must contain at least one symbol';
            }
        });
    }
    if (!validator.equals(input.password, input.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = validateRegisterInput;
