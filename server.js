// Load Environmental Variables
const rootPath = require('app-root-path');
require(rootPath + '/config/env/loadEnv')(); 

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Custom Modules 
const connectToMongoDb = require(rootPath + '/config/db/connectDb');
const apiRouter = require(rootPath + '/routes/api/users');

// App Instantiation
const app = express(); 

// Parsing Middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection
connectToMongoDb(); 

// API
app.use(apiRouter); 

// Routes
app.get('/', (req, res, next) => {
	res.send('Server is running successfully!');
});

// Server Port Line
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}...`));