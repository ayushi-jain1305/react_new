import React , {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorhandler';

class Orders extends Component {
    state={
        ordersList : [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders = []
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false , ordersList: fetchOrders});
            })
            .catch(error => {
                this.setState({ loading: false});
            })
    }

    render(){
        let orders = this.state.ordersList.reverse().map(orderitem => (
            <Order key={orderitem.id} ingredients={orderitem.ingredients} price={orderitem.price} />
        ))
        return(
            <div>
                {orders  }
            </div>
        );
    }
}

export default withErrorHandler(Orders , axios);