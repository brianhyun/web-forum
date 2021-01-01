// Load Environmental Variables
const rootPath = require('app-root-path');
require(rootPath + '/config/env/loadEnv')();

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');

// Custom Modules
const connectToDb = require(rootPath + '/config/db/connectToDb');
const usersAPIRouter = require(rootPath + '/routes/api/users');
const postsAPIRouter = require(rootPath + '/routes/api/posts');
const forumsAPIRouter = require(rootPath + '/routes/api/forums');

// App Instantiation
const app = express();

// Database Connection
connectToDb();

// Parsing and Static-Serving Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Passport Middleware
require(rootPath + '/config/passport/passport');
app.use(passport.initialize());

// API
app.use(usersAPIRouter);
app.use(forumsAPIRouter);
app.use(postsAPIRouter);

// Frontend
if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'staging'
) {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Server Port Line
app.listen(process.env.PORT);
