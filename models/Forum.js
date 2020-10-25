// Mongoose
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Subdocuments
const { userSchema } = require('./User');

const forumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    public: {
        type: Boolean,
        required: true,
    },
    members: {
        type: [userSchema],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Forum = model('Forum', forumSchema);

module.exports = Forum;
