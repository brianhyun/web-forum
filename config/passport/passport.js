const rootPath = require('app-root-path');
const User = require(rootPath + '/models/User');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_PRIVATE_KEY,
};

function verify(jwt_payload, done) {
    User.findById(jwt_payload.id)
        .then((user) => {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => console.error(err));
}

function passportConfig(passport) {
    passport.use(new JwtStrategy(options, verify));
}

module.exports = passportConfig;
