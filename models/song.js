var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var songSchema = new Schema({
    no: {type: Number, required: true, unique: true},
    link: {type: String, required: true, unique: true},
    user: {type: String, required: true},
    genre: {type: String, required: true},
    review: {type: String, required: true}
});

songSchema.plugin(autoIncrement.plugin, {
    model: 'song',
    field: 'no',
    startAt: 1,
    increment: 1
});

module.exports = mongoose.model('song', songSchema);