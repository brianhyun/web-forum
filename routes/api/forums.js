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

    forumExists(forumName)
        .then((forumExists) => {
            if (!forumExists) {
                return res.status(400).json({
                    forumName: 'A forum with this name cannot be found.',
                });
            } else {
                // forumExists is just the forum object, which is returned by the .findById() mongoose method in the forumExists() function.
                joinForum(forumExists, input, res);
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

async function joinForum(forum, input, res) {
    if (input.password) {
        const isMatch = await bcrypt.compare(input.password, forum.password);

        if (isMatch) {
            addIdsToDocument(forum, input);

            return res.send({
                forumId: forum._id,
                isPublic: forum.public,
                userIsAuthenticated: true,
                userId: input.userId,
            });
        } else {
            return res.status(400).json({
                password: 'Incorrect password',
            });
        }
    } else {
        addIdsToDocument(forum, input);

        return res.send({
            forumId: forum._id,
            isPublic: forum.public,
            userId: input.userId,
        });
    }
}

async function addIdsToDocument(forumData, input) {
    try {
        const forumId = forumData._id;
        const userId = input.userId;

        const user = await User.findById(userId);
        if (!user.forums.includes(forumId)) {
            user.forums.push(forumId);
            await user.save();
        }

        const forum = await Forum.findById(forumId);
        if (!forum.members.includes(userId)) {
            forum.members.push(userId);
            await forum.save();
        }
    } catch (err) {
        console.error(err);
    }
}

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
    const userId = input.userId;

    forumExists(forumName)
        .then((forumExists) => {
            if (forumExists) {
                res.status(400).json({
                    name: 'This name is already taken.',
                });
            } else {
                if (underForumLimit(userId)) {
                    createNewForum(input, res);
                } else {
                    console.log('limit exceeded');
                    res.status(400).json({
                        limit: 'Limit exceeded for numbers of forums created.',
                    });
                }
            }
        })
        .catch((err) => console.error(err));
});

async function underForumLimit(userId) {
    try {
        const user = await User.findById(userId);

        return user.forumsCreated <= 4;
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

        newForum.members.push(input.userId);

        const userId = await saveForumIdAndIncrementForumsCreatedInUserDocument(
            input.userId,
            newForum._id
        );

        if (!input.isPublic) {
            await hashAndSavePassword(input, newForum);
        }

        await newForum.save();

        res.json({
            userId: userId,
            forumId: newForum._id,
        });
    } catch (err) {
        console.error(err);
    }
}

async function saveForumIdAndIncrementForumsCreatedInUserDocument(
    userId,
    newForumId
) {
    try {
        // Find User and Save New Forum's ID to User's Document
        const user = await User.findById(userId);
        user.forums.push(newForumId);

        // Increment Number of Forum's Created Counter
        user.forumsCreated++;

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

        return;
    } catch (err) {
        console.error(err);
    }
}

// Get Forums of a Single User
router.post('/api/forums/getUsersForums', (req, res, next) => {
    const userId = req.body.userId;

    User.findById(userId)
        .populate({
            path: 'forums',
            select: '_id name',
        })
        .then((user) => {
            if (user) {
                res.send(user.forums);
            }
        })
        .catch((err) => console.error(err));
});

// Get Forum's Name
router.post('/api/forums/getForumName', (req, res, next) => {
    const forumId = req.body.forumId;

    Forum.findById(forumId)
        .then((forum) => {
            if (forum) {
                res.send(forum.name);
            }
        })
        .catch((err) => console.error(err));
});

// Get Forum's Member
router.post('/api/forums/getForumMembers', (req, res, next) => {
    const forumId = req.body.forumId;

    Forum.findById(forumId)
        .populate({
            path: 'members',
            select: '_id name',
        })
        .then((forum) => {
            if (forum) {
                res.send(forum.members);
            }
        })
        .catch((err) => console.error(err));
});

// Get Forum's Member
router.post('/api/forums/getForumPosts', (req, res, next) => {
    const forumId = req.body.forumId;

    Forum.findById(forumId)
        .populate({
            path: 'posts',
            populate: [
                {
                    path: 'author',
                    select: '_id name',
                },
                {
                    path: 'parentForum',
                    select: '_id name',
                },
            ],
        })
        .then((forum) => {
            if (forum) {
                res.send(forum.posts);
            }
        })
        .catch((err) => console.error(err));
});

module.exports = router;
