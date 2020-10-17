const mongoose = require('mongoose');

function connectToMongoDb() {
	// Open Connection to Database
	mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true, 
		useUnifiedTopology: true
	});

	// Check Connection 
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => console.log('Successfully connected to database...'));
}

module.exports = connectToMongoDb;