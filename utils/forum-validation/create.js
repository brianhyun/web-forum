const validator = require('validator');
const passwordValidator = require('password-validator');
const isEmpty = require('is-empty');

const schema = new passwordValidator();

schema
    .is()
    .min(8)
    .is()
    .max(30)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces()
    .has()
    .symbols(1);

function validateCreateInput(input) {
    let errors = {};

    // Convert Empty Fields To Empty String to Use Validator Functions
    input.name = !isEmpty(input.name) ? input.name : '';

    // Name Checks
    if (validator.isEmpty(input.name)) {
        errors.name = 'Name field is required';
    }

    // If Not Public, Password Exists - Password Checks
    if (!input.isPublic) {
        // Convert Empty Fields To Empty String to Use Validator Functions
        input.password = !isEmpty(input.password) ? input.password : '';

        if (validator.isEmpty(input.password)) {
            errors.password = 'Password field is required';
        } else {
            if (!schema.validate(input.password)) {
                const errorList = schema.validate(input.password, {
                    list: true,
                });

                errorList.forEach((errorType) => {
                    if (errorType === 'min') {
                        errors.password =
                            'Password must be at least 8 characters';
                    } else if (errorType === 'max') {
                        errors.password =
                            'Password cannot exceed 30 characters';
                    } else if (errorType === 'uppercase') {
                        errors.password =
                            'Password must contain at least one uppercase letter';
                    } else if (errorType === 'lowercase') {
                        errors.password =
                            'Password must contain at least one lowercase letter';
                    } else if (errorType === 'digits') {
                        errors.password =
                            'Password must contain at least two digits';
                    } else if (errorType === 'spaces') {
                        errors.password =
                            'Password must not contain any spaces';
                    } else if (errorType === 'symbols') {
                        errors.password =
                            'Password must contain at least one symbol';
                    }
                });
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}

module.exports = validateCreateInput;
