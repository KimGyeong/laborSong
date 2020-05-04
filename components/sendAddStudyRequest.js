const studyModel = require('../models/study');

const sendAddStudyRequest = (user, level, title, link) => {
    const study = new studyModel();

    study.user = user;
    study.level = level;
    study.title = title;
    study.link = link;

    study.save(function (err) {
        if (err) {
            console.error(err);
        }
    });
};

module.exports = sendAddStudyRequest;