import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token : null , 
	userId : null,
	loading :false,
	error: null
}

const reducerAuth = (state = initialState , action) => {
	switch (action.type){
		case actionTypes.AUTH_START : 
			return{
				...state , 
				error: null,
				loading : true
			};
		case actionTypes.AUTH_SUCCESS : 
			return{
				...state , 
				error: null,
				loading : false,
				userId : action.userId,
				token : action.idToken
			};
		case actionTypes.AUTH_FAILS : 
			return{
				...state , 
				error: action.error,
				loading : false
			};

		case actionTypes.AUTH_LOGOUT : 
			return{
				...state , 
				token : null ,
				uiserId : null
			};
		default:
			return state;
	}
}

export default reducerAuth;