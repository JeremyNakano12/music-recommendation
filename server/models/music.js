let mongoose = require('mongoose');

let songSchema = new mongoose.Schema({
    name: {type: String, required:true},
    artist: {type: String, required:true},
    url_video: {type: String, required: true},
    votes: {type: Number, requires:true}
});

let song = mongoose.model('song', songSchema);

module.exports = song;