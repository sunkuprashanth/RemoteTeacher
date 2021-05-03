import React, {useState} from 'react'
import {connect} from 'react-redux'
import {loginUser, loadUser} from "../actions/userActions"
import {Link, Redirect} from "react-router-dom"


function Login({loginUser, loadUser}) {
	
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const onChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	}

	const onLogin = () =>{
		const {email, password} = user;
		if (email ==='' && password === '')
			console.log("Please Enter All the Fields");
		else {
			//loadUser();
			loginUser({
				email, password
			});
		}
	}

	return (
		<div className="row mt-5">
			<div className="col-lg-6 card card-custom ml-auto mr-auto mt-5">
				<h2 className="text-center mt-5">Login to Access your account</h2>
					<form class="form" action="/login" method="post">
						<center>
							<div class="col-lg-4 mt-4">
								<input class="form-control" onChange={onChange} name="email" placeholder="Enter Your Email"/><br />
								<input class="form-control" onChange={onChange}  type="password" name="password" placeholder="Enter Your Password"/><br />
							</div>
							<Link class="btn-dark btn" type="button" to="/" onClick={onLogin} id="login">Login</Link>
						</center>
					</form>
					<center>
						<p class="text-center mt-3 mb-5">New User? <a href="/register">Register Here</a></p>
					</center>
			</div>
		</div>
	)
}

export default connect(null, {loginUser, loadUser})(Login)
