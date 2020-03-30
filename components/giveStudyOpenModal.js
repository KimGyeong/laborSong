const axios = require('axios');
const qs = require('qs');

const giveStudyOpenModal = async (trigger_id, token) => {
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
                "block_id": "study_select_block",
                "element": {
                    "type": "static_select",
                    "action_id": "study_select_value",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "레벨을 지정해주세요.",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "레벨 1",
                                "emoji": true
                            },
                            "value": "레벨_1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "레벨 2",
                                "emoji": true
                            },
                            "value": "레벨_2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "레벨 3",
                                "emoji": true
                            },
                            "value": "레벨_3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "레벨 4",
                                "emoji": true
                            },
                            "value": "레벨_4"
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