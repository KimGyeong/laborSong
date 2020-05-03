require('dotenv').config();
const schedule = require('node-schedule');

const token = process.env.BOT_TOKEN;
const sendGiveStudyMessage = require('../components/sendGiveStudyMessage');

    schedule.scheduleJob('*/5 * * * * *', function () {
        console.log("되니?");
        sendGiveStudyMessage('테스트채널', 1, token)
    });

module.exports = schedules;