const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    forums: [{ type: Schema.Types.ObjectId, ref: 'Forum' }],
    forumsCreated: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = model('User', userSchema);

module.exports = User;
