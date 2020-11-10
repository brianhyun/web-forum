// Mongoose
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Subdocuments
const { commentSchema } = require('./Comment');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    comments: {
        type: [commentSchema],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Post = model('Post', postSchema);

module.exports = {
    postSchema,
    Post,
};
