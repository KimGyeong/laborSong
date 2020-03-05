var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new Schema({
    link: String,
    genre: String,
    review: String
});

module.exports = mongoose.model('song', songSchema);