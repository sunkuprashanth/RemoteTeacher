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
	FILTER,
} from "../actions/types";

const initialState = {
	user: null,
	loading: false,
	teachers: null,
	bookings: null,
	errors: null,
	isAuthenticated: false,
	token: null,
	filtered: null
}

export default (state = initialState, action) => {
	switch(action.type) {
		case LOGIN_USER:
		case REGISTER_USER:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				token: action.payload
			}
		case GET_USER:
			return {
				...state,
				loading: false,
				user: action.payload,
				token: localStorage.token,
				isAuthenticated: true
			}
		case ADD_BOOKING:
			return {
				...state,
				bookings: [...state.bookings, action.payload],
				loading: false
			}
		case SET_LOADING:
			return {
				...state,
				loading: true
			}
		case LOG_OUT: 
			console.log("removed");
			localStorage.removeItem('token');
			return {
				...state,
				loading: false,
				user: null,
				token: null,
				isAuthenticated: false,
				bookings: null,
				errors: null
			}
		case FILTER: 
			return {
				...state,
				filtered: state.teachers.filter( teacher => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return teacher.name.match(regex) || teacher.subject.match(regex);
				} )
			}
		case GET_TEACHERS:
			return {
				...state,
				loading: false,
				teachers: action.payload,
				filtered: action.payload
			}
		case GET_BOOKINGS:
			return {
				...state,
				bookings: action.payload,
				loading: false
			}
		case LOGS_ERROR: 
			return {
				...state,
				errors: action.payload.message
			}
		default: 
			return state
	}
}