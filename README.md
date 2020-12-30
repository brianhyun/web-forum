# Issues

-   [ ]

# Stuff I Learned

## Technical

In regards to authentication: the jwtFromRequest field in the passport options object should be supplied with a callback. This callback, called the extractor, takes in a request object as an argument and returns the encoded JWT string or null. Passport.js provides a series of extractor factory functions, which return extractors.
