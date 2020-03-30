var request = require('request');

const categoryCheck = function (linkId, callback) {
    var optionParams = {
        part: "snippet",
        key: "AIzaSyDZM8gZzoeqOSft2SEacIV8PXcMzmZWQ-s",
        id: linkId
    };

    var url = "https://www.googleapis.com/youtube/v3/videos?";

    for (var option in optionParams) {
        url += option + "=" + optionParams[option] + "&";
    }

    console.log(linkId);

    return new Promise(resolve => request(url, function (err, res, body) {
        //json형식을 서버로 부터 받음
        var data = JSON.parse(body).items;
        console.log(data);
        if (data[0].snippet.categoryId != 10) {
            console.log('잘못된 링크입니다.');
            resolve(true);
        } else {
            resolve(false);
        }
    }));
};

module.exports = categoryCheck;
