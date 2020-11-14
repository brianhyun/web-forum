const express = require('express');
const rootPath = require('app-root-path');
const bcrypt = require('bcrypt');

const User = require(rootPath + '/models/User');
const Forum = require(rootPath + '/models/Forum');
const validateJoinInput = require(rootPath + '/utils/forum-validation/join');
const validateCreateInput = require(rootPath +
    '/utils/forum-validation/create');

const router = express.Router();

// Join Forum
router.post('/api/forums/join', (req, res, next) => {
    const input = req.body;
    const { errors, isValid } = validateJoinInput(input);

    // Check Validation - Invalid Input
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Valid Input - Check DB for Forum Privacy Status
    const forumName = input.name;

    Forum.findOne({ name: forumName })
        .then((forum) => {
            if (forum) {
                // Create Payload with Forum-Specific Information
                const data = {
                    forumId: forum._id,
                };

                if (input.password) {
                    bcrypt
                        .compare(input.password, forum.password)
                        .then((isMatch) => {
                            if (isMatch) {
                                data.userIsAuthenticated = true;
                                data.isPublic = forum.public;

                                return res.send(data);
                            } else {
                                return res.status(400).json({
                                    password: 'Incorrect password',
                                });
                            }
                        });
                } else {
                    data.isPublic = forum.public;

                    return res.send(data);
                }
            } else {
                return res.status(400).json({
                    forum: 'A forum with this name cannot be found.',
                });
            }
        })
        .catch((err) => console.error(err));
});

// Create Forum
router.post('/api/forums/create', (req, res, next) => {
    const input = req.body;
    const { errors, isValid } = validateCreateInput(input);

    // Check Validation - Invalid Input
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Valid Input - Check Database for Forum
    const forumName = input.name;
    const forumIsPublic = input.isPublic;

    Forum.findOne({ name: forumName })
        .then((forum) => {
            if (forum) {
                return res.status(400).json({
                    name: 'This name is already taken.',
                });
            } else {
                const newForum = new Forum({
                    name: forumName,
                    public: forumIsPublic,
                });

                const userId = input.userId;

                User.findById(userId)
                    .then((user) => {
                        if (user) {
                            // Add New Forum's ID to Forums Array in User's Document
                            user.forums.push(newForum._id);

                            user.save().catch((err) => console.error(err));
                        }
                    })
                    .then(() => {
                        const payload = {
                            forum: forum,
                            userId: userId,
                        };

                        if (!forumIsPublic) {
                            const forumPassword = input.password;
                            const saltRounds = 10;

                            bcrypt.hash(forumPassword, saltRounds, function (
                                err,
                                hash
                            ) {
                                if (err) {
                                    console.error(err);
                                }

                                newForum.password = hash;

                                return newForum
                                    .save()
                                    .then((forum) => res.json(payload))
                                    .catch((err) => console.error(err));
                            });
                        } else {
                            return newForum
                                .save()
                                .then((forum) => res.json(payload))
                                .catch((err) => console.error(err));
                        }
                    })
                    .catch((err) => console.error(err));
            }
        })
        .catch((err) => console.error(err));
});

// Get Forums of a Single User
router.post('/api/forums/getUsersForums', (req, res, next) => {
    const userId = req.body.userId;

    User.findById(userId)
        .populate('forums')
        .then((user) => {
            if (user) {
                const usersForums = user.forums;
                const forumsInfo = [];

                for (let i = 0; i < usersForums.length; i++) {
                    const forum = {
                        forumId: usersForums[i]._id,
                        name: usersForums[i].name,
                    };

                    forumsInfo.push(forum);
                }

                res.send(forumsInfo);
            }
        })
        .catch((err) => console.error(err));
});

// Get Info for Single Forum
router.post('/api/forums/getForumInfo', (req, res, next) => {
    const forumId = req.body.forumId;

    Forum.findById(forumId)
        .then((forum) => {
            if (forum) {
                res.send(forum);
            }
        })
        .catch((err) => console.error(err));
});

module.exports = router;
