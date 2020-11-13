// Mongoose
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

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
    posts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    },
    members: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Forum = model('Forum', forumSchema);

module.exports = Forum;
