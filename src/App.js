import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'

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
				<BurgerBuilder />
	        </Layout>
	      </div>
	    );
	}
}

export default App;
