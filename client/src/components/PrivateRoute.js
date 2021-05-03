import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux"

function PrivateRoute(props) {
	const {component: Component, user: {isAuthenticated, loading}, ...rest} = props;

	//console.log(isAuthenticated, loading, localStorage);
	return (
		<Route {...rest} render={props => (isAuthenticated || loading) || localStorage.token ? (
			<Component {...props} />
		) : (
			<Redirect to="/login" />
		)} />
	)
}

export default connect(state => ({user: state.user}))(PrivateRoute)