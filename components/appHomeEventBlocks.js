const axios = require('axios');
const qs = require('qs');

const appHomeEventBlocks = async (userID, token) => {
    const modal = [
            {
                "type":
                    "home",
                "elements":
                    [
                        {
                            "type": "button",
                            "action_id": "add_song",
                            "text": {
                                "type": "plain_text",
                                "text": ":musical_keyboard: 노래 등록",
                                "emoji": true
                            },
                            "value": "click_me_123",
                        },
                        {
                            "type": "button",
                            "action_id": "give_song",
                            "text": {
                                "type": "plain_text",
                                "text": ":musical_note: 노래 추천",
                                "emoji": true
                            },
                        },
                        {
                            "type": "button",
                            "action_id": "add_study",
                            "text": {
                                "type": "plain_text",
                                "text": ":male-technologist: 스터디 자료 등록",
                                "emoji": true
                            },
                            "value": "click_me_123",
                        },
                        {
                            "type": "button",
                            "action_id": "give_study",
                            "text": {
                                "type": "plain_text",
                                "text": ":female-technologist: 스터디 자료 추천",
                                "emoji": true
                            },
                        }
                    ]
            }
        ]
    ;
    const args = {
        token: token,
        user_id: userID,
        view: JSON.stringify(modal)
    };
    await axios.post('https://slack.com/api/views.publish', qs.stringify(args));
};

module.exports = appHomeEventBlocks;