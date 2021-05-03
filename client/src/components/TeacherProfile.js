import React, { useEffect, useState } from 'react'
import {connect} from "react-redux";
import { $CombinedState } from 'redux';
import { getTeachers, addBooking } from '../actions/userActions';

function TeacherProfile(props) {

	const [clss, setClss] = useState({
		date:"",
		info: ""
	});

	const [teach, setTeach] = useState({
		image: '',
		name: 'djsdsn'
	});
	const {teachers, getTeachers, addBooking} = props;
	let sel_teacher = {};

	useEffect(() => {
		let teacher = props.match.params.teacher;
		getTeachers();
		if (teachers) {
			sel_teacher = teachers.filter(teach => (teach.name === teacher));
			sel_teacher = sel_teacher[0]
			setTeach(sel_teacher);
	   }
	}, []);

	const onChange = e => {
		setClss({
			...clss,
			[e.target.name]: e.target.value
		});

	}

	const onSchedule = e => {
		e.preventDefault();
		clss.date = clss.date.split('-').join("/");
		clss.date = clss.date.split('T').join(" ");
		console.log(clss);
		const data = {
			time: clss.date,
			subject: teach.subject,
			teacher: teach._id,
			teacher_name: teach.name,
			info: clss.info
		}
		addBooking(data);
		setClss({
			date:"",
			info:""
		});
		document.getElementsByName("date")[0].value="";
		alert("Booking Successful");
	}

	return (
		<div className="row m-5 pl-5">
			<div className="col-lg-3">
				<img className="card-img-top bg-secondary p-2 w-75 mt-4 mb-2" alt="jbfsk" src={teach.image} />
				<h4>{teach.name}</h4>
				<p><i class="fa fa-map-marker"></i> {teach.location}</p>
			</div>
			<div className="col-lg-5">
				<h3>{teach.name.toUpperCase()}</h3>
				<label className="border border-2 border-secondary mt-4 display-inline pl-1 pr-1 rounded">{teach.subject}</label>
				<p><strong> Why Should you hire me? </strong> </p>
				<p>{teach.detail}</p>
				<p><strong> Language of Instruction </strong> </p>
				<p>English</p>
				<p><strong> Fees </strong> </p>
				<p>₹ {teach.fee} per Session</p>
				<p>Each session is of 1:00 hr duration</p>
			</div>
			<div className="col-lg-3">
				<br /><br /><br /><br />
				<p><strong> Fees </strong> </p>
				<p>₹ {teach.fee} per Session</p>
				<p>Each session is of 1:00 hr duration</p>
				<form className="card p-3 mt-5 bg-light" onSubmit={onSchedule}>
					<h5 className="text-center mb-4 mt-2">Schedule your class</h5>
					<input type="datetime-local" onChange={onChange} name="date" className="form-control mb-2" placeholder="Select the date and time of session"/>
					<textarea rows="2" onChange={onChange} name="info" value={clss.info} className="form-control mb-3" placeholder="Enter your Experience/ Expectations/ Requirements ..."></textarea>
					<button className="btn btn-outline-primary">Schedule class</button>
				</form>
			</div>
		</div>
	)
}

export default connect(state => ({teachers: state.user.teachers}), {getTeachers, addBooking})(TeacherProfile)