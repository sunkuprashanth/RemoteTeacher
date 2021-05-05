import React, { Fragment, useEffect } from 'react'
import TeacherItem from './TeacherItem'
import {getTeachers} from "../actions/userActions"
import {connect} from "react-redux"

function Teachers({teachers, getTeachers}) {
	useEffect(() => {
		getTeachers();
	}, []);
	let i=0;
	return (
		<div className="bigbox mt-5 pr-5">
			{
				teachers!==null && teachers.map( teacher => {
				i++;
				return <TeacherItem key={i} teacher={teacher} />
				})
			}
		</div>
	)
}

export default connect(state => ({teachers: state.user.filtered}), {getTeachers}) (Teachers);
