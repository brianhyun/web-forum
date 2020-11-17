// Mongoose
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    comments: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Post = model('Post', postSchema);

module.exports = Post;
