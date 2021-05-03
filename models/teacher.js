const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema({
	name: String,
	detail: String,
	subject: String,
	fee: String,
	image: String,
	location: String
});

const Teacher = mongoose.model('teacher', TeacherSchema);

module.exports = Teacher;