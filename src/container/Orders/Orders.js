import React , {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorhandler';
import { connect } from 'react-redux';
import * as actionHandler from '../../store/actions/indexAct';
import Spinner from '../../components/Burger/UI/Spinner/Spinner';

class Orders extends Component {
    // state={
    //     ordersList : [],
    //     loading: true
    // }

    componentDidMount(){
        this.props.onFetchOrders(this.props.token , this.props.userId);
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchOrders = []
        //         for(let key in res.data){
        //             fetchOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({ loading: false , ordersList: fetchOrders});
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false});
        //     })
    }

    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.ordersList.reverse().map(orderitem => (
                <Order key={orderitem.id} ingredients={orderitem.ingredients} price={orderitem.price} />
            ))
        }


         
        return(
            <div>
                {orders  }
            </div>
        );
    }
}

const mapToStateProps = state => {
    return{
        ordersList : state.orderRed.orders , 
        loading : state.orderRed.loading ,
        token : state.authRed.token,
        userId : state.authRed.userId
    }
}

const mapToDispatchProps = dispatch => {
    return {
        onFetchOrders : (token , userId) => {dispatch(actionHandler.fetchOrders(token , userId))}
    }
}

export default connect(mapToStateProps , mapToDispatchProps)(withErrorHandler(Orders , axios));