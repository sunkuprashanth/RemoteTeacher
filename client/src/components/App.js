import React, { Fragment, useEffect } from 'react'
import Navbar from './Navbar'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Register from './Register';
import {Provider} from 'react-redux';
import store from "./store";
import TeacherProfile from './TeacherProfile';
import Bookings from './Bookings';
import PrivateRoute from './PrivateRoute';

function App({loadUser}) {

	return (
		<Provider store={store}>
			<Fragment>
				<Router>
					<Navbar />
					<Switch>
						<PrivateRoute exact path="/" component={Home}/>
						<Route exact path="/login" component={Login}/>
						<Route exact path="/register" component={Register}/>
						<PrivateRoute exact path="/teacher/:teacher" component={TeacherProfile} />
						<PrivateRoute exact path="/bookings" component={Bookings} />
					</Switch>
				</Router>
			</Fragment>	
		</Provider>
	);
}

export default App;
