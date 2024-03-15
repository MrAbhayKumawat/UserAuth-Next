// user.js

import mongoose from "mongoose";
// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the User model based on the schema
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
