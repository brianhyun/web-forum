const express = require('express');
const rootPath = require('app-root-path');

// Only if I decide to tie each post to the user.
// const { User } = require(rootPath + '/models/User');
const Forum = require(rootPath + '/models/Forum');
const Post = require(rootPath + '/models/Post');

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

    // Valid Input
    const newPost = new Post({
        title: input.title,
        content: input.content,
        author: input.author,
    });

    const forumId = input.forumId;

    Forum.findById(forumId)
        .then((forum) => {
            // Save Post ID to Forum Document
            if (forum) {
                forum.posts.push(newPost._id);

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

module.exports = router;
