const express = require('express');
const rootPath = require('app-root-path');

const Forum = require(rootPath + '/models/Forum');

const router = express.Router();

router.post('/api/forums/join', (req, res, next) => {
    // Retrieve Input
    const input = req.body;

    // Expand Inputs
    const forumName = input.name;

    // Check Database for Forum
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
    // Retrieve and Expand Inputs
    const input = req.body;
    const forumName = input.name;
    const forumIsPublic = input.public;

    // Check Database for Forum
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
