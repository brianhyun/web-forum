const express = require('express');
const rootPath = require('app-root-path');
const bcrypt = require('bcrypt');

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
						The input has a password field indicating that:
							(1) the user has submitted a private forum name and 
							(2) the UI has revealed the password field for submission into the private forum and 
							(3) the user is now submitting a password to enter the private forum. 
						
						(1) Check that the submitted password matches the password stored in the database. 
						(2) Create a new field in the payload object specifying that user has been authenticated. 
					*/
                    bcrypt
                        .compare(input.password, forum.password)
                        .then((isMatch) => {
                            // Correct Password Submitted
                            if (isMatch) {
                                data.userIsAuthenticated = true;

                                return res.send(data);
                            } else {
                                // Wrong Password Submitted
                                return res.status(400).json({
                                    password: 'Incorrect password',
                                });
                            }
                        });
                } else {
                    /*
						The input doesn't have a password field indicating that the user has submitted a name for a forum they wish to enter. 
						
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
                if (!forumIsPublic) {
                    // Hash Password
                    const saltRounds = 10;

                    // This is an asynchronous action.
                    // Therefore, it will store this function in the event loop and move on to the next statement.
                    // The password, therefore, is never saved into the database unless the newForum.save() method is called within the bcrypt method.
                    bcrypt.hash(input.password, saltRounds, function (
                        err,
                        hash
                    ) {
                        if (err) {
                            console.error(err);
                        }

                        // Add Password to Forum Document
                        newForum.password = hash;

                        // Save New Private Forum (WithPassword) into Database
                        newForum
                            .save()
                            .then((forum) => res.json(forum))
                            .catch((err) => console.error(err));
                    });
                } else {
                    // Save New Public Forum (Without Password) into Database
                    newForum
                        .save()
                        .then((forum) => res.json(forum))
                        .catch((err) => console.error(err));
                }
            }
        })
        .catch((err) => console.error(err));
});

module.exports = router;
