// monogdb.js

const mongoose = require('mongoose');

// MongoDB connection URI
const uri = process.env.MONGOBD_URI;

// Options to pass to the mongoose.connect() method
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

async function connectToMongoDB() {
    try {
        await mongoose.connect("mongodb+srv://mrabhaykumawat9:lWWlP5ueorQWBfiQ@user-auth.abskbu6.mongodb.net/", options);
        console.log('Connected to MongoDB Successfully');
        // You can start using your models and perform operations here
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToMongoDB;
