// Dependencies
const express = require('express');
const rootPath = require('app-root-path');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require(rootPath + '/models/User');

// Utilities
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
    const options = {
        session: false,
    };

    passport.authenticate('local', options, (err, user, info) => {
        if (err) {
            console.error(err);
            // return next(err);
        }

        if (!user) {
            // info is an object containing either the username or password error
            return res.status(400).json(info);
        }

        req.login(user, options, function (err) {
            if (err) {
                console.error(err);
                // return next(err);
            }

            const payload = {
                userId: user._id,
                username: user.username,
            };

            const jwtOptions = {
                expiresIn: '30min',
            };

            jwt.sign(
                payload,
                process.env.JWT_PRIVATE_KEY,
                jwtOptions,
                (err, token) => {
                    if (err) {
                        console.error(err);
                    }

                    // Send JWT to Client via Cookie
                    const cookieOptions = {
                        maxAge: 1800000,
                        httpOnly: true,
                        // secure: true,
                    };

                    res.cookie('jwt', token, cookieOptions);
                    res.send({ token });
                }
            );
        });
    })(req, res);
});

router.get(
    '/api/users/getUsernameInfo',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.send({
            fullName: req.user.name,
            username: req.user.username,
        });
    }
);

module.exports = router;
