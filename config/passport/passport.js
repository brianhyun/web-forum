// Dependencies
const rootPath = require('app-root-path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');

// Models
const User = require(rootPath + '/models/User');

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJWT.Strategy;

const cookieExtractor = function (req) {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }

    return token;
};

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_PRIVATE_KEY,
};

passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
        User.findById(jwt_payload.userId)
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => done(err, false));
    })
);

passport.use(
    new LocalStrategy(function (username, password, done) {
        User.findOne({ username })
            .then((user) => {
                if (!user) {
                    return done(null, false, {
                        username:
                            'An account with that username cannot be found.',
                    });
                }

                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            password: 'Password entered is incorrect.',
                        });
                    }
                });
            })
            .catch((err) => done(err));
    })
);
