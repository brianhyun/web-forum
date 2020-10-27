const express = require('express');
const rootPath = require('app-root-path');

const Forum = require(rootPath + '/models/forums');

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
    // Retrieve Input
    const input = req.body;

    // Expand Inputs
    const forumName = input.name;

    // Check Database for Forum
    Forum.findOne({ name: forumName })
        .then((forum) => {
            if (forum) {
                // Forum Doesn't Exist
                return res.status(400).json({
                    forum: 'This name is already taken.',
                });
            } else {
                // Create New Forum
            }
        })
        .catch((err) => console.error(err));
});

module.exports = router;
