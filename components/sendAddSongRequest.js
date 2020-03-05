const sendAddSongRequest = async (link, one_sentence_review, genre) => {
    var song = new AddedSong();
    song.link = link;
    song.genre = genre;
    song.review = one_sentence_review;
    song.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
}

module.exports = sendAddSongRequest;