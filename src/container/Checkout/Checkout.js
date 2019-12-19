import React , {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    // state ={
    //     ingredients :null,
    //     totalPrice: 0
    // }
    //  componentWillMount() {
    //      const query = new URLSearchParams(this.props.location.search);
    //      const updatedingredients = {};
    //      let finalprice= 0;
    //      for (let param of query.entries()) {
    //         if(param[0] == 'price'){
    //             finalprice = param[1];
    //         }else{
    //             updatedingredients[param[0]] = +param[1];
    //         }
             
    //      }
    //      this.setState({ingredients : updatedingredients , totalPrice: finalprice});
    //  }


    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.props.ingr}
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}
                 />
                <Route path={ this.props.match.url+'/contact-data' } component={ContactData} />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{
        ingr: state.ingredients,
        price:state.totalPrice
    };
}


export default connect(mapStateToProps)(Checkout);