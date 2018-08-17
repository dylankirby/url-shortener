const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
	url: {
		type: String,
		unique: true,
		required: true
	},
	shortenedHash: {
		type: String,
		unique: true,
		required: true
	},
	count: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Url', urlSchema);