import React, { useState } from 'react'
import {connect} from "react-redux";
import {addUser} from "../actions/userActions"
import {Link, Redirect} from "react-router-dom"

function Register({addUser}) {

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		type: 'student'
	});

	const onChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	}

	const onRegister = () =>{
		const {name, email, password, password2, type} = user;

		if (password !== password2)
			console.log("Passwords do not match");
		else {
			addUser({
				name, email, password, type
			});
		}


	}

	return (
		<div className="row mt-5">
			<div className="col-lg-6 card card-custom ml-auto mr-auto mt-5 pb-4">
				<h2 className="text-center mt-5">Create Your Account</h2>
					<form className="form" action="/login" method="post">
						<center>
							<div class="col-lg-4 mt-4">
								<input className="form-control" onChange={onChange} name="name" placeholder="Enter Your Full Name"/><br />
								<input className="form-control" onChange={onChange} name="email" placeholder="Enter Your Email"/><br />
								<input className="form-control" onChange={onChange} type="password" name="password" placeholder="Enter Your Password"/><br />
								<input className="form-control" onChange={onChange} type="password" name="password2" placeholder="Confirm Your Password"/><br />
							</div>
							<Link type="button" onClick={onRegister} to="/" className="btn-dark btn mb-3" id="register">Register</Link>
						</center>
					</form>
			</div>
		</div>
	)
}

export default connect(null, {addUser})(Register);