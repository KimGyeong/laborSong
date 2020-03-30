const axios = require('axios');
const qs = require('qs');

const study = require('../models/study');

const sendGiveStudyMessage = async (channel, level, token) => {
    let tempResult = "";
    study.find({level: level.toString()}, {_id:false, link: false}, function (err, studys) {
        for (let value in studys) {
            tempResult +=
                ("레벨 : "
                    + studys[value].level
                    + "\n"
                    + " 제목 : "
                    + studys[value].title
                    + "\n"
                    + " 링크 : "
                    + studys[value].link
                    + "\n");
        }
    });

    const args = {
        token: token,
        channel: channel,
        text: tempResult
    };

    const result = axios.post(`https://slack.com/api/chat.postMessage`, qs.stringify(args));

    try {
        console.log(result.data);
    } catch (e) {
        console.log(e);
    }
};

module.exports = sendGiveStudyMessage;