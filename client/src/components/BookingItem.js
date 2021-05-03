import React from 'react'
import {Link} from "react-router-dom";

function BookingItem({booking}) {
	return (
			<div className="bg-light col-md-3 card m-5 p-4">
				<div className="card p-2 pl-3">
					<p>Class At <strong>{booking.time}</strong></p>
					<p>Topic is on <strong>{booking.subject}</strong></p>
					<p>Teacher Name is <Link to={`/teacher/${booking.teacher_name}`} className="text-info">{booking.teacher_name}</Link></p>
					<button type="buttton" className="btn btn-outline-primary mr-2 mb-2 mt-2" onClick={() => (alert("You have joined the class"))}> Join the class</button>
				</div>
			</div>
	)
}

export default BookingItem;