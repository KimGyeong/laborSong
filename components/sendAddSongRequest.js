const songModel = require('../models/song');

const sendAddSongRequest = async (user, link, one_sentence_review, genre) => {
    const song = new songModel();
    song.user = user;
    song.link = link;
    song.genre = genre;
    song.review = one_sentence_review;

    song.save(function (err) {
        if (err) {
            console.error(err);
        }
    });
};

module.exports = sendAddSongRequest;