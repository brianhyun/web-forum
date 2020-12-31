const mongoose = require('mongoose');

function connectToDb() {
    // Open Connection to Database
    mongoose
        .connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => console.error(err));

    // Check Connection
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Successfully connected to database...');
        return;
    });
}

module.exports = connectToDb;
