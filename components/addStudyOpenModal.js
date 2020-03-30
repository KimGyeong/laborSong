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
                "type": "section",
                "block_id": "add_study_block",
                "text": {
                    "type": "plain_text",
                    "text": "안녕하세요 공부 괴물입니다! ",
                    "emoji": true
                }
            },
            ,
            {
                "type": "input",
                "block_id": "add_study_level_selcet_block",
                "element": {
                    "type": "static_select",
                    "action_id": "study_level_value",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "레벨을 선택해주세요.",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "level1",
                                "emoji": true
                            },
                            "value": "level1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "level2",
                                "emoji": true
                            },
                            "value": "level2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "level3",
                                "emoji": true
                            },
                            "value": "level3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "level4",
                                "emoji": true
                            },
                            "value": "level4"
                        }
                    ]
                },
                "label": {
                    "type": "plain_text",
                    "text": "장르",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "add_study_title_value_block",
                "element": {
                    "action_id": "add_study_title_value",
                    "type": "plain_text_input"

                },
                "label": {
                    "type": "plain_text",
                    "text": "알맞은 제목을 붙여주세요!",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "add_study_link_value_block",
                "element": {
                    "action_id": "add_study_link_value",
                    "type": "plain_text_input"
                },
                "label": {
                    "type": "plain_text",
                    "text": "링크를 적어주세요!",
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