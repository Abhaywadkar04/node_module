const mongoose = require('mongoose');

// Correct the typo in the MongoDB URI
const mongodb = 'mongodb://127.0.0.1:27017/hotels';

mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected at ' + mongodb);
});

db.on('error', (err) => {
    console.log('MongoDB connection error: ' + err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
