// Mongoose
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
