const express = require('express');
const rootPath = require('app-root-path');

const Forum = require(rootPath + '/models/Forum');
const validateJoinInput = require(rootPath + '/utils/forum-validation/join');
const validateCreateInput = require(rootPath +
    '/utils/forum-validation/create');

const router = express.Router();

router.post('/api/forums/join', (req, res, next) => {
    // Variablize and Validate Input
    const input = req.body;
    const { errors, isValid } = validateJoinInput(input);

    // Check Validation - Invalid Input
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Valid Input - Check Database for Forum
    const forumName = input.name;

    Forum.findOne({ name: forumName })
        .then((forum) => {
            if (forum) {
                // Check User-Submitted Password to Stored Password
            } else {
                // Forum Doesn't Exist
                return res.status(400).json({
                    forum: 'A forum with this name cannot be found.',
                });
            }
        })
        .catch((err) => console.error(err));
});

router.post('/api/forums/create', (req, res, next) => {
    // Variablize and Validate Input
    const input = req.body;
    const { errors, isValid } = validateCreateInput(input);

    // Check Validation - Invalid Input
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Valid Input - Check Database for Forum
    const forumName = input.name;
    const forumIsPublic = input.public;

    Forum.findOne({ name: forumName })
        .then((forum) => {
            if (forum) {
                // Forum Already Exists
                return res.status(400).json({
                    forum: 'This name is already taken.',
                });
            } else {
                // Forum Doesn't Exist: Create New Forum
                const newForum = new Forum({
                    name: forumName,
                    public: forumIsPublic,
                });

                // Forum is Private
                if (forumIsPublic === false) {
                    newForum.password = input.password;
                }

                // Save New Forum to Database
                newForum
                    .save()
                    .then((forum) => res.json(forum))
                    .catch((err) => console.error(err));
            }
        })
        .catch((err) => console.error(err));
});

module.exports = router;
