const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	type: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;