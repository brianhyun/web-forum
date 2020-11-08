const express = require('express');
const rootPath = require('app-root-path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require(rootPath + '/models/User');
const validateLoginInput = require(rootPath + '/utils/auth-validation/login');
const validateSignupInput = require(rootPath + '/utils/auth-validation/signup');
const emailOrUsernameExists = require(rootPath +
    '/models/auth-validation/checkDb');

const router = express.Router();

router.post('/api/users/signup', (req, res, next) => {
    // Variablize and Validate Input
    const input = req.body;
    const { errors, isValid } = validateSignupInput(input);

    // Check Validation - Invalid Input
    if (!isValid) {
        res.status(400).json(errors);
    }

    // Valid Input - Check If Email/Username Already Exist in Database
    emailOrUsernameExists(input)
        .then((results) => {
            // Email/Username Exists
            if (results.itExists) {
                return res.status(400).json(results.errors);
            }

            // Email/Username Doesn't Exist - Create New User
            const newUser = new User({
                name: input.name,
                username: input.username,
                email: input.email,
            });

            // Hash Password
            const saltRounds = 10;
            bcrypt.hash(input.password, saltRounds, function (err, hash) {
                if (err) {
                    console.error(err);
                }

                newUser.password = hash;

                newUser
                    .save()
                    .then((user) => res.json(user))
                    .catch((err) => console.error(err));
            });
        })
        .catch((err) => console.error(err));
});

router.post('/api/users/login', (req, res, next) => {
    // Variablize and Validate Input
    const input = req.body;
    const { errors, isValid } = validateLoginInput(input);

    // Check Validation - Invalid Input
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Valid Input - Check If User Exists
    const username = input.username;
    const password = input.password;

    User.findOne({ username })
        .then((user) => {
            // Username Exists
            if (user) {
                bcrypt.compare(password, user.password).then((isMatch) => {
                    // Correct Password Submitted
                    if (isMatch) {
                        // Create Payload
                        const payload = {
                            id: user.id,
                            username: username,
                        };

                        // Sign JWT
                        jwt.sign(
                            payload,
                            process.env.JWT_PRIVATE_KEY,
                            { expiresIn: '1h' },
                            (err, token) => {
                                if (err) {
                                    console.error(err);
                                }

                                // Send JWT to Client
                                const data = {
                                    token: token,
                                    userId: user.id,
                                };

                                res.send(data);
                            }
                        );
                    } else {
                        // Wrong Password Submitted
                        return res.status(400).json({
                            password: 'Password entered is incorrect.',
                        });
                    }
                });
            } else {
                // Username Doesn't Exist
                return res.status(400).json({
                    username: 'An account with that username cannot be found.',
                });
            }
        })
        .catch((err) => console.error(err));
});

module.exports = router;
