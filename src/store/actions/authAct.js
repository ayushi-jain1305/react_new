import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (token , userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken :token ,
		userId : userId
	}
}

export const authFails = (error) => {
	return {
		type: actionTypes.AUTH_FAILS,
		error : error
	}
}

export const authLogout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expiryDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expiTime) => {
	return dispatch => {
		setTimeout (() => {
			dispatch(authLogout());
		},expiTime * 1000)
	}
}

export const authInit = (email , password , isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email : email, 
			password : password ,
			returnSecureToken : true
		}
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyLs0QTKBhFIef7faG5Z7_6zK2OxnufBQ';
		if( !isSignup ){
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyLs0QTKBhFIef7faG5Z7_6zK2OxnufBQ'
		}
		axios.post(url , authData)
			.then(response => {
				console.log(response);
				const expiryDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
				localStorage.setItem('token',response.data.idToken);
				localStorage.setItem('expiryDate', expiryDate);
				localStorage.setItem('userId', response.data.localId);
				dispatch(authSuccess(response.data.idToken , response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn))
			})
			.catch(error => {
				console.log(error);
				dispatch(authFails(error));
			})
	}
}

export const setAuthRedirectPath = (path) => {
	return {
		type : actionTypes.SET_AUTH_REDIRECT_PATH,
		path:path
	}
}

export const authCheckStatus = () => {
	return dispatch => {
		console.log('sdsdsd');
		const tokenVal = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		if(!tokenVal){
			dispatch(authLogout())
		}else{
			const expiTime = new Date(localStorage.getItem('expiryDate'));
			if( expiTime <= new Date()){
				dispatch(authLogout())
			}else{
				dispatch(authSuccess(tokenVal , userId));
				dispatch(checkAuthTimeout( (expiTime.getTime() - new Date().getTime()) / 1000));
			}
			
		}
	}
}