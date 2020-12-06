// Dependencies
const mongoose = require('mongoose');
const express = require('express');
const rootPath = require('app-root-path');

// Models
const Forum = require(rootPath + '/models/Forum');
const Post = require(rootPath + '/models/Post');
const Comment = require(rootPath + '/models/Comment');

// Utilities
const validatePostInput = require(rootPath + '/utils/post-validation/create');
const validateCommentInput = require(rootPath +
    '/utils/comment-validation/create');

const router = express.Router();

// Create New Post
router.post('/api/posts/create', (req, res, next) => {
    const input = req.body;
    const { errors, isValid } = validatePostInput(input);

    // Check Validation - Invalid Input
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Valid Input
    const forumObjectId = mongoose.Types.ObjectId(input.forumId);
    const authorObjectId = mongoose.Types.ObjectId(input.authorId);

    const newPost = new Post({
        title: input.title,
        content: input.content,
        author: authorObjectId,
        parentForum: forumObjectId,
    });

    Forum.findById(input.forumId)
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
    const input = req.body;

    Post.findById(input.postId)
        .populate([
            {
                path: 'author',
                select: 'name _id',
            },
            {
                path: 'parentForum',
                select: 'name _id',
            },
            {
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'name _id',
                },
            },
        ])
        .then((post) => {
            if (post) {
                res.send(post);
            }
        })
        .catch((err) => console.error(err));
});

// Get Comments for a Single Post
router.get('/api/posts/getPostComments', (req, res, next) => {
    const input = req.body;

    Post.findById(input.postId)
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'name _id',
            },
        })
        .then((post) => {
            if (post) {
                res.send(post.comments);
            }
        })
        .catch((err) => console.error(err));
});

// Add Comment to a Single Post
router.post('/api/posts/addComment', (req, res, next) => {
    const input = req.body;
    const { errors, isValid } = validateCommentInput(input);

    // Check Validation - Invalid Input
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Valid Input
    const newComment = new Comment({
        content: input.content,
        author: input.authorId,
    });

    newComment
        .save()
        .then(() => {
            Post.findById(input.postId).then((post) => {
                if (post) {
                    post.comments.unshift(newComment._id);

                    post.save();
                }
            });
        })
        .catch((err) => console.error(err));
});

module.exports = router;
