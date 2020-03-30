const express = require('express');
const router = express.Router();

// Actions
router.use('/actions', require('./actions'));

// Events
router.use('/events', require('./events'));

module.exports = router;