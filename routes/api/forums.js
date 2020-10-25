const express = require('express');
const rootPath = require('app-root-path');

const Forum = require(rootPath + '/models/forums');

const router = express.Router();

router.post('/api/forums/join', (req, res, next) => {
    // Retrieve Input
    const input = req.body;

    // Check Database for Forum
});

module.exports = router;
