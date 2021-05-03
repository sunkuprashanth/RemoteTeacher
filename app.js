const express = require("express");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
const User = require("./models/user");
const Booking = require("./models/booking");
const Teacher = require("./models/teacher");
const path = require('path');

const app = express();
app.use(express.json({ extended: false}));
connectDB();

app.post("/api/users", async (req, res) => {

	const name = req.body.name;
	const email = req.body.email;
	let password = req.body.password;
	const type = req.body.type;

	const salt = await bcrypt.genSalt(10);
	password = await bcrypt.hash(password, salt);

	const user = new User({
		name, email, password, type
	});
	user.save();

	const payload = {
		user: user.id
	}
	jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000}, (err, token) => {
		if (err) {
			console.log(err.message);
		} else 
			res.send({token})
	});
});

app.get("/api/users", auth, async (req, res) => {
	console.log("HSISOJSOS");
	const id = req.user;
	const user = await User.findById(id);
	if (user) {
		res.json({user: user})
	} else {
		res.send("Server Error");
	}
});

app.post("/api/login", async (req, res) => {
	
	const email = req.body.email;
	const password = req.body.password;

	const [fetched] = await User.find({email:email});
	console.log(email, password);

	if (!fetched) {
		res.status(400).json({msg: "Invalid Credentials"});
		return;
	}

	const validated = await bcrypt.compare(password, fetched.password);

	if (validated) {
		const payload = {
			user: fetched.id
		}
		jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000}, (err, token) => {
			if (err) {
				console.log(err.message);
			} else 
				res.send({token})
		});
	} else {
		res.status(400).json({msg: "Invalid Credentials"});
	}
});


app.post("/api/teacher", async (req, res) => {

	const name = req.body.name;
	const detail = req.body.detail;
	const subject = req.body.subject;
	const fee = req.body.fee;
	const image = req.body.image;
	const location = req.body.location;

	const new_teacher = new Teacher({
		name, detail, subject, fee, image, location
	});

	const result = await new_teacher.save();

	if (result)
		res.json({msg: "Teacher Added Succesfully"});
	else
		res.send("Server Error");

});

app.get("/api/teacher", async (req, res) => {

	const teachers = await Teacher.find({});
	if (teachers)
		res.send(teachers)
	else
		res.send("Server Error");
});

app.post("/api/booking", auth, async (req, res) => {

	const user = req.user;
	const time = req.body.time;
	const subject = req.body.subject;
	const teacher = req.body.teacher;
	const teacher_name = req.body.teacher_name;
	const info = req.body.info;

	const booking = new Booking({
		user, time, subject, teacher, teacher_name, info
	});

	const result = booking.save();

	if (result)
		res.json({msg: "Booking Successful"});
	else
		res.send("Server Error");
});

app.get("/api/booking", auth, async (req, res) => {

	const user = req.user;

	const bookings = await Booking.find({user: user});

	if (bookings)
		res.send(bookings);
	else
		res.send("Server Error");

});

if (process.env.NODE_ENV == 'production') {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
