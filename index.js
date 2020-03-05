require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const axios = require('axios');
const qs = require('qs');
const app = express();
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://rutgo:rutgo1@ds221990.mlab.com:21990/heroku_nc9pp90w');

const song = require('./models/song');


app.listen(process.env.PORT || 3000, function () {
    console.log('3000 PORT OPEN');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/events', (req, res) => {

    if (req.body.challenge && req.body.type == "url_verification") {
        res.json({challenge: req.body.challenge});
    }
    if (req.body.event.type === 'app_mention') {
        appMentionEventBlocks(req.body.event.channel);
        res.json('');
    }
});

app.post(`/actions`, (req, res) => {
    const {token, trigger_id, user, actions, type, channel} = JSON.parse(req.body.payload);
    if (actions && actions[0].action_id.match(`add_song`)) {
        addSongOpenModal(trigger_id);
    } else if (actions && actions[0].action_id.match('give_song')) {
        giveSongOpenModal(trigger_id);
    } else if (type === 'view_submission') {
        const genre = JSON.parse(req.body.payload).view.state.values.songSelect.songValue.selected_option.value;
        send("테스트채널", genre);
        res.send({response_action:"clear"});
    }
});

const appMentionEventBlocks = async (channel) => {
    const modal = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "노래를 등록하시거나, 노래를 추천해드립니다~"
            }
        },
        {
            "type":
                "actions",
            "elements":
                [
                    {
                        "type": "button",
                        "action_id": "add_song",
                        "text": {
                            "type": "plain_text",
                            "text": "노래 등록하기",
                            "emoji": true
                        },
                        "value": "click_me_123",
                    },
                    {
                        "type": "button",
                        "action_id": "give_song",
                        "text": {
                            "type": "plain_text",
                            "text": "노래 추천 받기",
                            "emoji": true
                        },
                    }
                ]
        }
    ];
    const args = {
        token: `xoxb-952248750261-966576957937-pcmQT7FClIeDMbddQttpfi69`,
        channel: channel,
        text: "노래 추천 해드릴께요",
        blocks: JSON.stringify(modal)
    };
    const result = await axios.post(`https://slack.com/api/chat.postMessage`, qs.stringify(args));
};

const addSongOpenModal = async (trigger_id) => {
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
                "type": "input",
                "element": {
                    "type": "plain_text_input"
                },
                "label": {
                    "type": "plain_text",
                    "text": "링크",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input"
                },
                "label": {
                    "type": "plain_text",
                    "text": "한줄평",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "element": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "장르",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*신나는 곡*",
                                "emoji": true
                            },
                            "value": "exciting"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "*차분한곡*",
                                "emoji": true
                            },
                            "value": "quiet"
                        }
                    ]
                },
                "label": {
                    "type": "plain_text",
                    "text": "장르",
                    "emoji": true
                }
            }
        ]
    };

    const args = {
        token: `xoxb-952248750261-966576957937-pcmQT7FClIeDMbddQttpfi69`,
        trigger_id: trigger_id,
        view: JSON.stringify(modal)
    };
    const result = await axios.post(`https://slack.com/api/views.open`, qs.stringify(args));
};

const giveSongOpenModal = async (trigger_id) => {
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
                "type": "input",
                "block_id": "songSelect",
                "element": {
                    "type": "static_select",
                    "action_id": "songValue",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "신나는곡",
                                "emoji": true
                            },
                            "value": "exciting"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "차분한곡",
                                "emoji": true
                            },
                            "value": "quiet"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "우울 그자체",
                                "emoji": true
                            },
                            "value": "value-2"
                        }
                    ]
                },
                "label": {
                    "type": "plain_text",
                    "text": "Label",
                    "emoji": true
                }
            }
        ]
    };

    const args = {
        token: `xoxb-952248750261-966576957937-pcmQT7FClIeDMbddQttpfi69`,
        trigger_id: trigger_id,
        view: JSON.stringify(modal)
    };
    const result = await axios.post(`https://slack.com/api/views.open`, qs.stringify(args));
};

const send = async (channel, genre) => {
    var songList = [];
    song.find({genre: genre.toString()}, {_id: false, genre: false}, function (err, songs) {
        for (var value in songs) {
            songList.push("링크 : " + songs[value].link + "\n" + "추천이유 : " + songs[value].review);
        }
        function shuffle(songList) {
            var j, x, i;
            for (i = songList.length; i; i -= 1) {
                j = Math.floor(Math.random() * i);
                x = songList[i - 1];
                songList[i - 1] = songList[j];
                songList[j] = x;
            }
        }

        shuffle(songList);

        text = songList[0];

        const args = {
            token: `xoxb-952248750261-966576957937-pcmQT7FClIeDMbddQttpfi69`,
            channel: channel,
            text: text
        };

        const result = axios.post(`https://slack.com/api/chat.postMessage`, qs.stringify(args));

        try {
            console.log(result.data);
        } catch (e) {
            console.log(e);
        }
    });
};