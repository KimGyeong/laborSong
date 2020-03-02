require('dotenv').config();

module.exports = function (app, Song) {
    app.get('/songs/', function (req, res) {
        Song.find({}, { _id: false, genre: false }, function (err, songs) {
            if (err) return res.status(500).send({ error: 'database error' });
            var songList = [];

            for (var value in songs) {
                songList.push("링크 : " + songs[value].link + "\n" + "추천이유 : " + songs[value].review);
            }

            console.log(songList);

            function shuffle(songList) {
                var j, x, i;
                for (i = songList.length; i; i -= 1) {
                    j = Math.floor(Math.random() * i);
                    x = songList[i - 1];
                    songList[i - 1] = songList[j];
                    songList[j] = x;
                }
            }

            const BOT_TOKEN = process.env.BOT_TOKEN;

            var RtmClient = require('slack-client').RtmClient;
            var WebClient = require('slack-client').WebClient;
            var token = BOT_TOKEN;

            var web = new WebClient(token);
            var rtm = new RtmClient(token, { logLevel: 'error' });
            rtm.start();

            var RTM_EVENTS = require('slack-client').RTM_EVENTS;

            rtm.on(RTM_EVENTS.MESSAGE, function (message) {
                var channel = message.channel;
                var user = message.user;
                var text = message.text;
                shuffle(songList);

                if (text == '노래') {
                    web.chat.postMessage(channel, songList[0].toString(), { username: "노동요" });
                }
            });
        });
    });

    // // 장르별 대로 목록 가져오기
    app.get('/songs/:genre', function (req, res) {
        Song.find({ genre: req.params.genre }, { _id: false, genre: false }, function (err, songs) {
            if (err) return res.status(500).send({ error: 'database error' });
            var songList = [];

            for (var value in songs) {
                songList.push(songs[value].link);
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

            const BOT_TOKEN = process.env.BOT_TOKEN;

            var RtmClient = require('slack-client').RtmClient;
            var WebClient = require('slack-client').WebClient;
            var token = BOT_TOKEN;

            var web = new WebClient(token);
            var rtm = new RtmClient(token, { logLevel: 'error' });
            rtm.start();

            var RTM_EVENTS = require('slack-client').RTM_EVENTS;

            rtm.on(RTM_EVENTS.MESSAGE, function (message) {
                var channel = message.channel;
                var user = message.user;
                var text = message.text;
                shuffle(songList);

                if (text == '노래') {
                    web.chat.postMessage(channel, songList[0].toString(), { username: "노동요" });
                }
            });
        });
    });
};
