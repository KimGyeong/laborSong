const axios = require('axios');
const qs = require('qs');

const giveStudyOpenModal = async (trigger_id, token) => {
    const modal = {
        "type": "modal",
        "title": {
            "type": "plain_text",
            "text": "자료 추천",
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
                "block_id": "study_select_block",
                "element": {
                    "type": "static_select",
                    "action_id": "study_select_value",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "레벨",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*Level 1*",
                                "emoji": true
                            },
                            "value": "level1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*Level 2*",
                                "emoji": true
                            },
                            "value": "level2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*Level 3*",
                                "emoji": true
                            },
                            "value": "level3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*Level 4*",
                                "emoji": true
                            },
                            "value": "level4"
                        }
                    ]
                },
                "label": {
                    "type": "plain_text",
                    "text": "레벨",
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

module.exports = giveStudyOpenModal;