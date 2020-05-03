require('dotenv').config();
const schedule = require('node-schedule');

const token = process.env.BOT_TOKEN;
const sendGiveStudyMessage = require('../components/sendGiveStudyMessage');

const sendGiveStudyMessageJob = schedule.scheduleJob('00 00 9 * * *', function () {
    sendGiveStudyMessage('테스트채널', "level1", token)
});

module.exports = sendGiveStudyMessageJob;