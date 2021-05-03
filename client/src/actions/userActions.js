import axios from "axios";
import {
	REGISTER_USER,
	GET_USER,
	LOGIN_USER,
	GET_TEACHERS,
	GET_BOOKINGS,
	ADD_BOOKING,
	LOG_OUT,
	LOGS_ERROR,
	SET_LOADING,
	FILTER
} from "./types";
import setAuthToken from "../utils/setAuthToken"

export const addUser = (user) => {

	return async dispatch => {
		try {
			dispatch(setLoading())
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
			const res = await axios.post("/api/users", user, config);
			console.log(res.data);
			dispatch({
				type: REGISTER_USER,
				payload: res.data
			});
			dispatch(loadUser());
		} catch (err) {
			console.log(err);
			dispatch ({
				type: LOGS_ERROR,
				payload: err
			});
		}
	}
}


export const loadUser = () => {
	return async (dispatch) => {
		dispatch(setLoading())
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		if (localStorage.token) {
				setAuthToken(localStorage.token);
		}
		try {
			const res = await axios.get("/api/users", config);
			console.log(res.data);

			dispatch ({
				type: GET_USER,
				payload: res.data
			});
			dispatch(getTeachers());
			dispatch(getBookings());
		} catch (err) {
			console.log(err);
			dispatch ({
				type: LOGS_ERROR,
				payload: err
			});
		}
	}
}

export const loginUser = user => {
	return async (dispatch) => {
		try {
			dispatch(setLoading())
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
			console.log(user);
			const res = await axios.post("/api/login", user, config);
			dispatch({
				type: LOGIN_USER,
				payload: res.data
			});
			dispatch(loadUser());
		} catch (err) {
			console.log(err);
			dispatch ({
				type: LOGS_ERROR,
				payload: err
			});
		}
	}
}

export const getBookings = () => {
	return async dispatch => {
		dispatch(setLoading());
		try {
			if(localStorage.token)
				setAuthToken(localStorage.token);
			const res = await axios.get("/api/booking");
			dispatch({
				type: GET_BOOKINGS,
				payload: res.data
			});
		} catch (err) {
			console.log(err);
			dispatch ({
				type: LOGS_ERROR,
				payload: err
			});
		}
	}
}

export const getTeachers = () => {
	return async dispatch => {
		dispatch(setLoading());
		try {
			const res = await axios.get("/api/teacher");
			dispatch({
				type: GET_TEACHERS,
				payload: res.data
			});
		} catch (err) {
			console.log(err);
			dispatch ({
				type: LOGS_ERROR,
				payload: err
			});
		}
	}
}

export const filterTeachers = text =>{
	return {
			type: FILTER,
			payload: text
	}
}

export const addBooking = (data) => {
	return async dispatch => {
		dispatch(setLoading());
		try {
			
			const res = await axios.post("/api/booking", data);
			console.log(res.data);

			dispatch ({
				type: ADD_BOOKING,
				payload: data
			});
		} catch (err) {
			console.log(err);
			dispatch ({
				type: LOGS_ERROR,
				payload: err
			});
		}
	}
}

export const setLoading = () => {
	return {
		type: SET_LOADING,
		payload: "0"
	}
}

export const logout = () => {
	console.log("logged");
	return {
		type: LOG_OUT
	}
}