import React from 'react'
import { Link } from 'react-router-dom'

function TeacherItem({teacher}) {

	const onMouseOver = e => {
		e.target.style.transform = 'scale(1.075)';
	}

	const onMouseOut = e => {
		e.target.style.transform = 'scale(1)';
	}
	return (
		<div className="col-lg-2 bg-light card align-items-center ml-5 mt-4" onMouseLeave={onMouseOut} onMouseEnter={onMouseOver}>
			<img className="card-img-top rounded-circle w-50 h-50 mt-4 mb-2" src={teacher.image} />
			<h4>{teacher.name}</h4>
			<label>I teach <strong>{teacher.subject}</strong></label>
			<p className="ml-3 mr-2 mt-2">{teacher.detail.slice(0,100)+" ..."}</p>
			<Link to={`/teacher/${teacher.name}`} query={teacher} className="btn btn-primary w-100 mb-3">View Full Profile</Link>
		</div>
	)
}

export default TeacherItem

