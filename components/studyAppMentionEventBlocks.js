const axios = require('axios');
const qs = require('qs');

const studyAppMentionEventBlocks = async (channel, token) => {
    const modal = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "공부할 것이 차고 넘칩니다."
            }
        },
        {
            "type":
                "actions",
            "elements":
                [
                    {
                        "type": "button",
                        "action_id": "add_study",
                        "text": {
                            "type": "plain_text",
                            "text": "스터디 자료 등록하기",
                            "emoji": true
                        },
                        "value": "click_me_123"
                    },
                    {
                        "type": "button",
                        "action_id": "give_study",
                        "text": {
                            "type": "plain_text",
                            "text": "스터디 자료 추천받기",
                            "emoji": true
                        }
                    }
                ]
        }
    ];
    const args = {
        token: token,
        channel: channel,
        text: "노래 추천 해드릴께요",
        blocks: JSON.stringify(modal)
    };
    const result = await axios.post(`https://slack.com/api/chat.postMessage`, qs.stringify(args));
};

module.exports = studyAppMentionEventBlocks;