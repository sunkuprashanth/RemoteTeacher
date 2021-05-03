import React from 'react'
import {filterTeachers} from "../actions/userActions"
import {connect} from "react-redux"

function SearchBar({filterTeachers}) {

	const onChange = e => {
		console.log(e.target.value);
		filterTeachers(e.target.value);
	}

	return (
		<div className=" col-lg-12 d-md-flex justify-content-md-end">
			<form class="d-flex col-lg-4 mt-3 ml-5 mr-5 pr-5">
				<input class="form-control me-2 mr-2" onChange={onChange} type="text" placeholder="Search based on teacher name and subject"/>
				<button class="btn btn-outline-dark mr-4" type="button">Search</button>
			</form>
		</div>
	)
}

export default connect(null, {filterTeachers})(SearchBar);