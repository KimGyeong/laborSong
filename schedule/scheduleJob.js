const schedule = require('node-schedule');
const sendMessage = require('../components/sendMessage');
const token = process.env.BOT_TOKEN;

let scheduleJob = schedule.scheduleJob('00 30 8 * * 1-5', function(){
    sendMessage('#테스트채널', 'exciting', token)
});

module.exports = scheduleJob;