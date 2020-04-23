var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var studySchema = new Schema({
    no: {type: Number, required: true, unique: true},
    user: {type: String, required: true},
    link: {type: String, required: true, unique: true},
    level: {type: String, required: true},
    title: {type: String, required: true}
});

autoIncrement.initialize(mongoose.connection);

studySchema.plugin(autoIncrement.plugin, {
    model: 'study',
    field: 'no',
    startAt: 1,
    increment: 1
});

module.exports = mongoose.model('study', studySchema);