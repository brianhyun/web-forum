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
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    },
    parentForum: { type: Schema.Types.ObjectId, ref: 'Forum', required: true },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Post = model('Post', postSchema);

module.exports = Post;
