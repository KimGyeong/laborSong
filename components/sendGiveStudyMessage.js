const axios = require('axios');
const qs = require('qs');

const studies = require('../models/study');

const sendGiveStudyMessage = (channel, level, token) => {
    let tempResult = "";

    studies.find({ level: level.toString() }, { _id: false, link: false }, async function (err, studies) {
        console.log("studies : " + studies);

        for (let value in studies) {
            console.log("value in for loop : " + studies[value]);
            tempResult +=
                ("레벨 : "
                    + studies[value].level
                    + "\n"
                    + " 제목 : "
                    + studies[value].title
                    + "\n"
                    + " 링크 : "
                    + studies[value].link
                    + "\n");
            console.log("tempResult in for loop : " + tempResult);
        }
        const args = {
            token: token,
            channel: channel,
            text: tempResult
        };
    
        const result = await axios.post('https://slack.com/api/chat.postMessage', qs.stringify(args));
    
        try {
            console.log("result : " + result.data);
            console.log(result.data);
        } catch (e) {
            console.log(e);
        }
    });
};

module.exports = sendGiveStudyMessage;