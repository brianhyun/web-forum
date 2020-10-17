// Load Environmental Variables
const rootPath = require('app-root-path');
require(rootPath + '/config/env/loadEnv')(); 

// Dependencies
const express = require('express');

// Custom Modules 
const connectToMongoDb = require(rootPath + '/config/db/connectDb');

// App Instantiation
const app = express(); 

// MongoDB Connection
connectToMongoDb(); 

// Routes
app.get('/', (req, res, next) => {
	res.send('Server is running successfully!');
});

// Server Port Line
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}...`));