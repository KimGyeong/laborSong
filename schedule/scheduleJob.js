const schedule = require('node-schedule');
const token = process.env.BOT_TOKEN;

const sendGiveStudyMessage = require('../components/sendGiveStudyMessage');
// '00 30 8 * * 1-5'

const sendStudyMessage = schedule.scheduleJob('00 10 19 * * *', function(){
    sendGiveStudyMessage('#테스트채널', 1, token)
});

module.exports = sendStudyMessage;