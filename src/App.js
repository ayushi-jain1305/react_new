import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import {Route} from 'react-router-dom';
import Orders from './container/Orders/Orders';

class App extends Component {
	// state={
	// 	unmount : true
	// }

	// componentDidMount() {
	// 	setTimeout(() => {
	// 		this.setState({ unmount:false })
	// 	},5000)
	// }

	render() {
	    return (
	      <div>
	        <Layout>
				<Route path="/" exact component={BurgerBuilder} />
				<Route path="/checkout" component={Checkout} />
				<Route path="/orders" component={Orders} />
	        </Layout>
	      </div>
	    );
	}
}

export default App;
