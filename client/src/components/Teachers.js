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
		<Fragment>
			{teachers!==null && teachers.map( teacher => {
				i++;
				return <TeacherItem key={i} teacher={teacher} />
				})
			}
		</Fragment>
	)
}

export default connect(state => ({teachers: state.user.filtered}), {getTeachers}) (Teachers);
