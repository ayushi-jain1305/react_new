import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import {Route , withRouter , Switch , Redirect} from 'react-router-dom';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/logout';
import { connect } from 'react-redux';
import * as actionHandler from './store/actions/indexAct';

class App extends Component {
	// state={
	// 	unmount : true
	// }

	// componentDidMount() {
	// 	setTimeout(() => {
	// 		this.setState({ unmount:false })
	// 	},5000)
	// }

	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		// let routes = (
		// 	<Switch>
		// 		<Route path="/auth" component={Auth} />
		// 		<Route path="/" exact component={BurgerBuilder} />
		// 		<Redirect to="/" />
		// 	</Switch>
		// )
		// if(this.props.isAuth){
		// 	routes = (
		// 		<Switch>
		// 			<Route path="/checkout" component={Checkout} />
		// 			<Route path="/orders" component={Orders} />
		// 			<Route path="/logout" component={Logout} />
		// 			<Route path="/" exact component={BurgerBuilder} />
		// 			<Redirect to="/" />
		// 		</Switch>
		// 	)
		// }


	    return (
	      <div>
	        <Layout>
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/auth" component={Auth} />
					<Route path="/logout" component={Logout} />
					<Route path="/" exact component={BurgerBuilder} />
				</Switch>
			</Layout>
	      </div>
	    );
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.authRed.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup : () => dispatch(actionHandler.authCheckStatus())
	}
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(App));
