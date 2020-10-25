const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const forumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Forum = model('Forum', forumSchema);

module.exports = Forum;
