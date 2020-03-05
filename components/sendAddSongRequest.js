const song = require('../models/song');

const sendAddSongRequest = async (link, one_sentence_review, genre) => {
    song.save(function(err){
        song.link = link;
        song.genre = genre;
        song.review = one_sentence_review;
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
}

module.exports = sendAddSongRequest;