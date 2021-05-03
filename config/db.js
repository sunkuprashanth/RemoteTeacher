const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
	const mongoURI = config.get("mongoURI");
	mongoose.connect(mongoURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	}).then(console.log("Connected To MongoDB")).catch(err => console.log(err.message));
}

module.exports = connectDB;