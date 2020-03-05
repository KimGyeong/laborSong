const axios = require('axios');
const qs = require('qs');

const addSongOpenModal = async (trigger_id, token) => {
    const modal = {
        "type": "modal",
        "title": {
            "type": "plain_text",
            "text": "My App",
            "emoji": true
        },
        "submit": {
            "type": "plain_text",
            "text": "Submit",
            "emoji": true
        },
        "close": {
            "type": "plain_text",
            "text": "Cancel",
            "emoji": true
        },
        "blocks": [
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input"
                },
                "label": {
                    "type": "plain_text",
                    "text": "링크",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input"
                },
                "label": {
                    "type": "plain_text",
                    "text": "한줄평",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "장르",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*신나는 곡*",
                                "emoji": true
                            },
                            "value": "exciting"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*차분한곡*",
                                "emoji": true
                            },
                            "value": "quiet"
                        }
                    ]
                },
                "label": {
                    "type": "plain_text",
                    "text": "장르",
                    "emoji": true
                }
            }
        ]
    };

    const args = {
        token: token,
        trigger_id: trigger_id,
        view: JSON.stringify(modal)
    };

    const result = await axios.post(`https://slack.com/api/views.open`, qs.stringify(args));
};

module.exports = addSongOpenModal;