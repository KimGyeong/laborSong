const axios = require('axios');
const qs = require('qs');

const song = require('../models/song');

const sendMessage = async (userId, genre, token) => {
    var songList = [];
    song.find({genre: genre.toString()}, {_id: false, genre: false}, function (err, songs) {
        for (let value in songs) {
            songList.push("> 링크 : " + songs[value].link + "\n" + "> 추천이유 : " + songs[value].review);
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
            token: token,
            channel: userId,
            text: text,
            as_user: true
        };

        const result = axios.post(`https://slack.com/api/chat.postMessage`, qs.stringify(args));

        try {
        console.log("result : " + result.data);
        console.log(result.data);
    } catch (e) {
        console.log(e);
    }
    });
};

module.exports = sendMessage;