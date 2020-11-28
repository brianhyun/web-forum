// Dependencies
const mongoose = require('mongoose');
const express = require('express');
const rootPath = require('app-root-path');

// Models
const Forum = require(rootPath + '/models/Forum');
const Post = require(rootPath + '/models/Post');

// Utilities
const validatePostInput = require(rootPath + '/utils/post-validation/create');

const router = express.Router();

// Create Forum
router.post('/api/posts/create', (req, res, next) => {
    const input = req.body;
    const { errors, isValid } = validatePostInput(input);

    // Check Validation - Invalid Input
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const authorObjectId = mongoose.Types.ObjectId(input.authorId);

    // Valid Input
    const newPost = new Post({
        title: input.title,
        content: input.content,
        author: authorObjectId,
    });

    const forumId = input.forumId;

    Forum.findById(forumId)
        .then((forum) => {
            // Save Post ID to Forum Document
            if (forum) {
                forum.posts.unshift(newPost._id);

                forum.save();
            }
        })
        .then(() => {
            newPost
                .save()
                .then((post) => res.send(post))
                .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
});

// Get Info for a Single Post
router.post('/api/posts/getPostInfo', (req, res, next) => {
    const postId = req.body.postId;

    Post.findById(postId)
        .populate({
            path: 'author',
            select: 'name _id',
        })
        .then((post) => {
            if (post) {
                res.send(post);
            }
        })
        .catch((err) => console.error(err));
});

module.exports = router;
