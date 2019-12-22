import React , {Component} from 'react';
import * as actionType from '../../../store/actions/indexAct';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {
	componentDidMount(){
		this.props.onLogout();
	}

	render(){
		return(
			<Redirect to="/" />
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLogout : () => dispatch(actionType.authLogout())
	}
}

export default connect(null,mapDispatchToProps)(Logout);