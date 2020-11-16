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

    forumExists(forumName)
        .then((forumExists) => {
            if (forumExists) {
                res.status(400).json({
                    name: 'This name is already taken.',
                });
            } else {
                createNewForum(input, res);
            }
        })
        .catch((err) => console.error(err));
});

async function forumExists(forumName) {
    try {
        const forumExists = await Forum.findOne({ name: forumName });

        return forumExists;
    } catch (err) {
        console.error(err);
    }
}

async function createNewForum(input, res) {
    try {
        const newForum = new Forum({
            name: input.name,
            public: input.isPublic,
        });

        const response = await saveNewForumIdInUserDocument(
            input.userId,
            newForum._id
        );

        const userData = {
            userId: response,
        };

        if (!input.isPublic) {
            await hashAndSavePassword(input, newForum);
        }

        await newForum.save();
        res.json(userData);
    } catch (err) {
        console.error(err);
    }
}

async function saveNewForumIdInUserDocument(userId, newForumId) {
    try {
        // Find User and Save New Forum's ID to User's Document
        const user = await User.findById(userId);
        user.forums.push(newForumId);

        // Save to Finalize Changes
        await user.save();

        return userId;
    } catch (err) {
        console.error(err);
    }
}

async function hashAndSavePassword(input, newForum) {
    try {
        // 10 = Number of Salt Rounds
        const hashedPassword = await bcrypt.hash(input.password, 10);

        newForum.password = hashedPassword;
    } catch (err) {
        console.error(err);
    }
}

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
