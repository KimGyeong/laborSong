const shuffle = function (songList) {
    var j, x, i;
    for (i = songList.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = songList[i - 1];
        songList[i - 1] = songList[j];
        songList[j] = x;
    }
};

module.exports = shuffle;