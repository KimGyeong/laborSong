const axios = require('axios');
const qs = require('qs');

const studies = require('../models/study');

const giveStudyViewModal = async (trigger_id, token, level) => {

    studies.find({level: level.toString()}, {_id: false, link: false}, function (err, studies) {
        console.log("studies : " + studies);

        let study_field = "[";

        for (let value in studies) {
            textValue = (" 제목 : "
                + studies[value].title
                + "\n"
                + " 링크 : "
                + studies[value].link
                + "\n");

            study_field += (
                "{"
                + "\"type\" : \"plain_text\","
                + "\"text\" : "
                + textValue
                + "\"emoji\" : true"
                + "}"
            )
            // tempResult +=
            //     ("레벨 : "
            //         + studies[value].level
            //         + "\n"
            //         + " 제목 : "
            //         + studies[value].title
            //         + "\n"
            //         + " 링크 : "
            //         + studies[value].link
            //         + "\n");
            // console.log("tempResult in for loop : " + tempResult);
        }

        study_field += "]";

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
                    "text": {
                        "type": "mrkdwn",
                        "text": "스터디 자료를 추천해줍니다!"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "fields": study_field
                }
            ]
        };

        console.log(modal);

        const args = {
            token: token,
            trigger_id: trigger_id,
            view: JSON.stringify(modal)
        };

        const result = axios.post(`https://slack.com/api/views.open`, qs.stringify(args));

        // result.then(result =>
        //     console.log(result)
        // ).catch(
        //     error =>
        //         console.log(error)
        // );

    });
};

module.exports = giveStudyViewModal;