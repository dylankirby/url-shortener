const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
	url: String
});

mongoose.model('urls', urlSchema);