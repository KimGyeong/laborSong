require('dotenv').config();

// let songs = ['https://www.youtube.com/playlist?list=PLl0rRg6gLsHYO_ys6ULX9uxRIwMa6_q-a',
//     'https://www.youtube.com/watch?v=o_UUYwymh30',
//     'https://www.youtube.com/watch?v=_wfvK8IT33o']

// function shuffle(songs) {
//     var j, x, i;
//     for (i = songs.length; i; i -= 1) {
//         j = Math.floor(Math.random() * i);
//         x = songs[i - 1];
//         songs[i - 1] = songs[j];
//         songs[j] = x;
//     }
// }

// var RtmClient = require('slack-client').RtmClient;
// var WebClient = require('slack-client').WebClient;
// var token = process.env.BOT_TOKEN;

// var web = new WebClient(token);
// var rtm = new RtmClient(token, { logLevel: 'error' });
// rtm.start();

// var RTM_EVENTS = require('slack-client').RTM_EVENTS;

// // rtm 모듈이 메세지를 받았을 때 반응
// rtm.on(RTM_EVENTS.MESSAGE, function (message) {
//     var channel = message.channel;
//     var user = message.user;
//     var text = message.text;

//     shuffle(songs);

//     if (text == '노래')
//         web.chat.postMessage(channel, songs[0], { username: "노동요" });
// });

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const Song = require('./models/song');
const router = require('./routes')(app, Song);


app.listen(process.env.PORT || 3000, function () {
    console.log('3000 PORT OPEN');
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    var data = {
        token: process.env.BOT_TOKEN,
        channel: "노동요",
        text: "",
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "생일을 등록하면 알려줄게요!"
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "생일 등록하기",
                            "emoji": true
                        },
                        "value": "click_me_123"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "이번달 생일자 보러가기",
                            "emoji": true
                        },
                        "response_url": "https://a667d3d6.ngrok.io/songs"
                    }
                ]
            }
        ]
    };

    request.post('https://slack.com/api/chat.postMessage', function (error, response, body) {
        res.json(data);
    });
});

app.post('/verify', (req, res) => {
    if (req.body.challenge && req.body.type == "url_verification") {
        res.json({ challenge: req.body.challenge });
    }
})