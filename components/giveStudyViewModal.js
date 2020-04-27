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

            study_field = "";

            const modal = [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": "*this is plain_text text*",
                            "emoji": true
                        }
                    ]
                }
            ]

            console.log(modal);

            const args = {
                token: token,
                trigger_id: trigger_id,
                view: JSON.stringify(modal)
            };

            const result = axios.post(`https://slack.com/api/views.open`, qs.stringify(args));

            result.then(response => {
                    console.log(response);
                    console.log(response.data);
                    console.log(response.data.response_metadata);
                }
            ).catch(
                error =>
                    console.log(error)
            );

        })
        ;
    }
;

module.exports = giveStudyViewModal;