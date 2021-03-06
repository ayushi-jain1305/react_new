import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess  = (id , orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId : id,
		orderData : orderData
	}
}

export const purchaseBurgerFails = (error) => {
	return {
		type:actionTypes.PURCHASE_BURGER_FAILS,
		error: error
	}
}

export const purchaseBurgerStart = () => {
	return {
		type:actionTypes.PURCHASE_BURGER_START
	}
}

export const purchaseBurger = (orderData , path , token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post('https://burger-project-react-4c33a.firebaseio.com/orders.json?auth='+token ,orderData )
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name , orderData) )
                console.log(path);
                path.push('/orders')
            })
            .catch(error => {
                 dispatch(purchaseBurgerFails(error));
            }) 
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFails = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILS,
		error: error
	}
}

export const fetchOrders = (token , userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		const queryparam = '?auth='+ token + '&orderBy="userId"&equalTo="'+ userId +'"';
		axios.get('https://burger-project-react-4c33a.firebaseio.com/orders.json'+queryparam)
            .then(res => {
                const fetchOrders = []
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchOrders))
            })
            .catch(error => {
            	dispatch(fetchOrdersFails(error))
            })
	}
}