var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studySchema = new Schema({
    link: {type: String, required: true, unique: true},
    level: {type: String, required: true},
    title: {type: String, required: true}
});

module.exports = mongoose.model('study', studySchema);