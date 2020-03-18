var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = new Schema({
    link: {type: String, required: true, unique: true},
    genre: {type: String, required: true},
    review: {type: String, required: true}
});

module.exports = mongoose.model('song', songSchema);