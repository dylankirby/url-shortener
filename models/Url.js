const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
	url: String,
	shortenedHash: String
});

module.exports = mongoose.model('Url', urlSchema);