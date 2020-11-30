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
                    forum: 'A forum with this name cannot be found.',
                });
            } else {
                // forumExists is actually just the forum object, which is returned by the .findById mongoose method in the forumExists() function.
                joinForum(forumExists, input, res);
            }
        })
        .catch((err) => console.error(err));
});

async function joinForum(forum, input, res) {
    const data = {
        forumId: forum._id,
    };

    if (input.password) {
        const isMatch = await bcrypt.compare(input.password, forum.password);

        if (isMatch) {
            data.userIsAuthenticated = true;
            data.isPublic = forum.public;

            return res.send(data);
        } else {
            return res.status(400).json({
                password: 'Incorrect password',
            });
        }
    } else {
        data.isPublic = forum.public;

        return res.send(data);
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

        newForum.members.push(input.userId);

        const userId = await saveNewForumIdInUserDocument(
            input.userId,
            newForum._id
        );

        if (!input.isPublic) {
            await hashAndSavePassword(input, newForum);
        }

        await newForum.save();
        res.json({ userId });
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
            populate: {
                path: 'author',
                select: '_id name',
            },
            populate: {
                path: 'parentForum',
                select: '_id name',
            },
        })
        .then((forum) => {
            if (forum) {
                res.send(forum.posts);
            }
        })
        .catch((err) => console.error(err));
});

module.exports = router;
