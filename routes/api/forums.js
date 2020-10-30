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

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check DB for Forum Privacy Status
    const forumName = input.name;

    Forum.findOne({ name: forumName })
        .then((forum) => {
            if (forum) {
                // Forum Found - Create Payload with Forum-Specific Information
                const data = {
                    forumId: forum._id,
                };

                if (input.password) {
                    /* 
						The input has a password field indicating that the user has followed the check-privacy-status flow and
						now needs to provide a password to enter the private forum. 
						
						(1) Check that the submitted password matches the password stored in the database. 
						(2) Create a new field in the payload object specifying that user has been authenticated. 
					*/
                    if (input.password === forum.password) {
                        data.userIsAuthenticated = true;

                        return res.send(data);
                    } else {
                        return res.status(400).json({
                            password: 'Incorrect password',
                        });
                    }
                } else {
                    /*
						The input doesn't have a password field indicating that we have to check the forum for its privacy status. 
						
						We'll check for the forum's privacy status and send that information back to 
						'forumAuthSlice.js', which will determine whether to send the user to the forum home 
						page (if public forum) or reveal the password field (if private forum). 
					*/
                    data.isPublic = forum.public;

                    return res.send(data);
                }
            } else {
                // Forum Not Found
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
    const forumIsPublic = input.isPublic;

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
