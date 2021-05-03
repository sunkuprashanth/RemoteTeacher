import React, { Fragment, useEffect } from 'react';
import {connect} from "react-redux";
import {loadUser, logout} from "../actions/userActions"
import {Link, Redirect} from "react-router-dom"

function Navbar({isAuthenticated, loadUser, logout}) {

	const onLogout = () =>{
		console.log("logout");
		logout();
		<Redirect to="/login" />
	}

	useEffect(() => {
		loadUser();
	}, []);

	return (
		<nav className="navbar navbar-light bg-dark">
			<h4 className=""><Link className="text-light nav-link" to="/">Remote Teacher</Link></h4>
			<div className="row">

				{ isAuthenticated ? (
					<Fragment>
						<div className="col-lg-3 mr-5">
							<Link className="nav-link text-light" to="/bookings">Bookings</Link>
						</div>
						<div className="col-lg-3 ml-2">
							<Link className="text-dark btn bg-light" onClick={onLogout} to="/login">Logout</Link>
						</div>
					</Fragment>
				) : (
					<Fragment>
						<div className="col-lg-3 mr-4">
							<Link className="nav-link text-light" to="/register">Register</Link>
						</div>
						<div className="col-lg-3 ml-2">
							<Link className="nav-link text-light" to="/login">Login</Link>
						</div>
					</Fragment>
				)}
				
			</div>
		</nav>
	)
}

export default connect(state => ({isAuthenticated: state.user.isAuthenticated}), {loadUser, logout})(Navbar)