// Load Environmental Variables
const rootPath = require('app-root-path');
require(rootPath + '/config/env/loadEnv')();

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

// Custom Modules 
const connectToMongoDb = require(rootPath + '/config/db/connectDb');
const userApiRouter = require(rootPath + '/routes/api/users');
const passportConfig = require(rootPath + '/config/passport/passport');

// App Instantiation
const app = express();

// Parsing Middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection
connectToMongoDb();

// Client Request Authentication with Passport Middleware
app.use(passport.initialize());
passportConfig(passport);

// API
app.use(userApiRouter);

// Server Port Line
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}...`));