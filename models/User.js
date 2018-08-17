const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	name: String,
	email: {
		type: String,
		unique: true,
		required: true
	}
});

module.exports = mongoose.model("User", userSchema);