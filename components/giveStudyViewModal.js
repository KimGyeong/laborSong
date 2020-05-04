const axios = require('axios');
const qs = require('qs');

const studies = require('../models/study');

const giveStudyViewModal = (trigger_id, token, level) => {

    studies.find({level: level.toString()}, {_id: false}, async function (err, studies) {
        let array = [];
        for (let value of studies) {
            array.push({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": value.title.toString()
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Click Me"
                    },
                    "url": value.link.toString()
                }
            })
        }

        const modal = {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "노래추천",
                "emoji": true
            },
            "blocks": array,
            "clear_on_close": true
        };

        console.log(modal);

        const args = {
            token: token,
            trigger_id: trigger_id,
            view: JSON.stringify(modal)
        };

        const result = await axios.post(`https://slack.com/api/views.push`, qs.stringify(args));

        console.log(result.data);
        console.log(result.data.response_metadata);
    });
};

module.exports = giveStudyViewModal;