const rootPath = require('app-root-path');
const User = require(rootPath + '/models/User');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_PRIVATE_KEY,
};

function passportConfig(passport) {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }

                    return done(null, false);
                })
                .catch((err) => done(err, false));
        })
    );
}

module.exports = passportConfig;
