import React from 'react'
import { Link } from 'react-router-dom'

function TeacherItem({teacher}) {

	const onMouseOver = e => {
		e.target.style.transform = 'scale(1.09)';
	}

	const onMouseOut = e => {
		e.target.style.transform = 'scale(1)';
	}

	const setBox = {height: "400px"};
	const setImage = {width:"150px", height:"150px"};
	
	return (
		<div className="box bg-light card align-items-center text-center ml-5 mt-4 mb-4" style={setBox} onMouseLeave={onMouseOut} onMouseEnter={onMouseOver}>
			<img className="card-img-top rounded-circle mt-4 mb-2" style={setImage} src={teacher.image} />
			<h4>{teacher.name}</h4>
			<label>I teach <strong>{teacher.subject}</strong></label>
			<p className="ml-3 mr-2 mt-2 text-body">{teacher.detail.slice(0,100)+" ..."}</p>
			<Link to={`/teacher/${teacher.name}`} query={teacher} className="btn btn-primary w-95 mb-3">View Full Profile</Link>
		</div>
	)
}

export default TeacherItem

