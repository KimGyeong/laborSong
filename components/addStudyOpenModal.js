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
                "block_id": "add_study_block",
                "element": {
                    "action_id": "add_song_link_value",
                    "type": "plain_text_input",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "링크를 입력해주세요."
                    }
                },
                "label": {
                    "type": "plain_text",
                    "text": "링크",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "add_study_title_value_block",
                "element": {
                    "action_id": "add_study_title_value",
                    "type": "plain_text_input",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "정성을 담아서 입력해주세요."
                    }
                },
                "label": {
                    "type": "plain_text",
                    "text": "한줄평",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "add_study_level_selcet_block",
                "element": {
                    "type": "static_select",
                    "action_id": "study_level_value",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "장르를 선택해주세요.",
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

    // 설명 듣고 변경하자.
    const args = {
        token: token,
        trigger_id: trigger_id,
        view: JSON.stringify(modal)
    };

    // 설명 듣고 변경하자.
    const result = await axios.post(`https://slack.com/api/views.open`, qs.stringify(args));
};

module.exports = addSongOpenModal;