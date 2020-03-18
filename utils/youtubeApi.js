var {google} = require('googleapis');

var service = google.youtube('v3');

var categoryCheck = function (linkId) {
    service.videos.list({
        key: 'AIzaSyDZM8gZzoeqOSft2SEacIV8PXcMzmZWQ-s',
        part: 'snippet,statistics',
        id: linkId,
        fields: 'items(snippet(title, categoryId))'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }

        var video = response.data.items;
        if (video.length === 0 || video.category !== 10) {
            console.log('잘못된 링크입니다.');
        } else {
            console.log(JSON.stringify(response.data.items[0], null, 4));
        }
    });
};

module.exports = categoryCheck;