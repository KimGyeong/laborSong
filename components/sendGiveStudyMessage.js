const axios = require('axios');
const qs = require('qs');

const studies = require('../models/study');
const shuffle = require('../utils/shuffle');

const sendGiveStudyMessage = (channel, level, token) => {
    studies.find({level: level.toString()}, {_id: false}, async function (err, studies) {
        shuffle(studies);

        const args = {
            token: token,
            channel: channel,
            text: studies[0].link
        };

        const result = await axios.post('https://slack.com/api/chat.postMessage', qs.stringify(args));

        if (result.data.ok === false) {
            console.log(result.data.response_metadata);
        }
    });
};

module.exports = sendGiveStudyMessage;