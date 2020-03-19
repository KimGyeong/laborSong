var {google} = require('googleapis');

var service = google.youtube('v3');

var categoryCheck = function (linkId) {
    service.videos.list({
        key: 'AIzaSyDZM8gZzoeqOSft2SEacIV8PXcMzmZWQ-s',
        part: 'snippet,statistics',
        id: linkId,
        fields: 'items(snippet(title, categoryId))'
    }, isCategoryCheck = function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        console.log(linkId);

        var video = response.data.items;
        console.log(video[0].snippet.categoryId);
        if (video[0].snippet.categoryId != 10) {
            console.log('잘못된 링크입니다.');
            return true;
        } else {
            console.log(JSON.stringify(response.data.items[0], null, 4));
            return false;
        }
    });
    console.log("테스트!" + isCategoryCheck);
    return isCategoryCheck;
};

module.exports = categoryCheck;