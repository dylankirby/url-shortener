const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
	url: String,
	shortenedHash: String,
	count: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Url', urlSchema);