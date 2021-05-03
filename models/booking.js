const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
	user: mongoose.Schema.Types.ObjectId,
	time: String,
	subject: String,
	teacher: mongoose.Schema.Types.ObjectId,
	teacher_name: String
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;