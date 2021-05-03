import React, { Fragment, useEffect, useState } from 'react'
import {connect} from "react-redux"
import {getBookings} from "../actions/userActions"
import BookingItem from './BookingItem';

function Bookings({bookings, getBookings}) {

	const [books, setBooks] = useState([]);

	useEffect(() => {
		setBooks(bookings);
	});

	return (
		<Fragment>
			<h3 className="text-center m-3 mt-4">List of your Classes</h3>
				{books!==null && books.length>0 ? 
					<div className="row pl-3 pr-3 m-auto mt-3">
						{books.map(booking => (<BookingItem booking={booking} />))}
					</div> :
					<div className="text-center p-3 bg-warning m-5">
						<h3 >You haven't done any bookings</h3>
					</div>
				}
		</Fragment>
	)
}

export default connect(state => ({bookings: state.user.bookings}), {getBookings})(Bookings)

const  booking =  {
	"_id":{"$oid":"608d50ba5181f057f8cbfc7c"},
	"user":{"$oid":"608d3a0ab5d30d4da04fc762"},
	"time":"10/08/2021 09:30",
	"subject":"physics",
	"teacher":{"$oid":"608d4a3dc13d50143c7a0f09"},
	"teacher_name":"trevor","__v":{"$numberInt":"0"}
}
