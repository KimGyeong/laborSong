const axios = require('axios');
const qs = require('qs');

const giveSongOpenModal = async (trigger_id, token) => {
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
                "block_id": "songSelect",
                "element": {
                    "type": "static_select",
                    "action_id": "songValue",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "신나는곡",
                                "emoji": true
                            },
                            "value": "exciting"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "차분한곡",
                                "emoji": true
                            },
                            "value": "quiet"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "우울 그자체",
                                "emoji": true
                            },
                            "value": "value-2"
                        }
                    ]
                },
                "label": {
                    "type": "plain_text",
                    "text": "Label",
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

module.exports = giveSongOpenModal;