import * as actionType from '../actions/actionTypes';

const initialState = {
	orders : [],
	loading: false
};

const reducerOrder = (state = initialState , action) => {
	switch(action.type){
		case actionType.PURCHASE_BURGER_START : 
		return {
			...state,
			loading: true
		}

		case actionType.PURCHASE_BURGER_SUCCESS :
			const newOrder = {
				...action.orderData,
				id: action.orderId
			} 
			return{
				...state,
				loading:false,
				orders : state.orders.concat(newOrder)
			};
		case actionType.FETCH_ORDERS_START :
			return {
				...state,
				loading: true
			}
		case actionType.PURCHASE_BURGER_FAILS : 
			return {
				...state,
				loading:false
			};
		case actionType.FETCH_ORDERS_SUCCESS :
			return {
				...state,
				loading: false,
				orders : action.orders
			}
		default :
			return state;
	}
}

export default reducerOrder;