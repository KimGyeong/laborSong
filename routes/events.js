require('dotenv').config();

const express = require('express');
const router = express.Router();
const token = process.env.BOT_TOKEN;

const appHomeEventBlocks = require('../components/appHomeEventBlocks');
const appMentionEventBlocks = require('../components/appMentionEventBlocks');

const events = router.post('/', (req, res) => {
    if (req.body.challenge && req.body.type == "url_verification") {
        res.json({challenge: req.body.challenge});
    }

    if (req.body.event.type === 'app_mention') {
        appMentionEventBlocks(req.body.event.channel, token);
        res.json('');
    }
    if(req.body.event.type === 'app_home_opened'){
        appHomeEventBlocks(req.body.event.channel, token);
        res.json('');
    }
});

module.exports = events;