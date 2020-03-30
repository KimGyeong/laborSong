var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studySchema = new Schema({
    level: String,
    title: String,
    link: String
});

module.exports = mongoose.model('study', studySchema);