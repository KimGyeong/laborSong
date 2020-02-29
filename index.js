require('dotenv').config();
// const botkit = require('botkit');

// const controller = botkit.slackbot({
//     debug: false,
//     log: true
// });

// controller.spawn({
//     token: process.env.BOT_TOKEN
// }).startRTM();

// const botScope = [
//     'direct_message',
//     'direct_mention',
//     'mention',
//     'ambient'
// ];

// controller.hears('도움', botScope, (bot, message) => {
//     bot.reply(message, '안녕하세요')
// })

// controller.hears('노래', botScope, (bot, message) => {
//     shuffle(songs);
//     bot.reply(message, songs[0]);
// });

let songs = ['https://www.youtube.com/playlist?list=PLl0rRg6gLsHYO_ys6ULX9uxRIwMa6_q-a',
    'https://www.youtube.com/watch?v=o_UUYwymh30',
    'https://www.youtube.com/watch?v=_wfvK8IT33o']

function shuffle(songs) {
    var j, x, i;
    for (i = songs.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = songs[i - 1];
        songs[i - 1] = songs[j];
        songs[j] = x;
    }
}

var RtmClient = require('slack-client').RtmClient;
var WebClient = require('slack-client').WebClient;
var token = process.env.BOT_TOKEN;

var web = new WebClient(token);
var rtm = new RtmClient(token, { logLevel: 'error' });
rtm.start();

var RTM_EVENTS = require('slack-client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    var channel = message.channel;
    var user = message.user;
    var text = message.text;

    shuffle(songs);

    if (text == '노래')
        web.chat.postMessage(channel, songs[0], { username: "노동요" });
});