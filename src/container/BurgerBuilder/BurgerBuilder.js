import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControlls from '../../components/Burger/BuildControlls/BuildControlls'
import Modal from '../../components/Burger/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Burger/UI/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorhandler/withErrorhandler';
import {connect} from 'react-redux';
import * as burgerBuilderAction from '../../store/actions/indexAct';

// const INGREDIENT_PRICE = {
//     cheese : 30 , 
//     salad: 20 , 
//     bacon : 70 , 
//     meat: 80 
// }

class BurgerBuilder extends Component {
    state = {
        // ingredients :null,
        // totalPrice: 0 ,
        purchaseable: false , 
        purchasing : false , 
        // loading: false,
        // error: false
    }

    componentDidMount() {
        this.props.initIngredients();
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients : response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error : true})
        //     })
    }
    
    // addIngredientHandler = (type) => {
    //     const countIngredient = this.state.ingredients[type] + 1;
    //     const updateIngredient = {
    //         ...this.state.ingredients
    //     }
    //     updateIngredient[type] = countIngredient;
    //     const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    //     this.setState({
    //         ingredients : updateIngredient ,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchaseHandler(newPrice);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.this.state.ingredients[type];
    //     if( oldCount <= 0){
    //         return;
    //     }
    //     const countIngredient = oldCount - 1;
    //     const updateIngredient = {
    //         ...this.state.ingredients
    //     }
    //     updateIngredient[type] = countIngredient;
    //     const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    //     this.setState({
    //         ingredients : updateIngredient ,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchaseHandler(newPrice);
    // }

    // updatePurchaseHandler = (newPrice) => {
    //     this.setState({
    //         purchaseable: newPrice > 0
    //     })
    // }

    purchasingHandler = () => {
        this.setState({
            purchasing : true
        })
    }
    purchaseCancelhandler = () => {
        this.setState({
            purchasing : false
        })
    }
    purchaseContinuehandler = () => {
        this.props.history.push('/checkout');
    }


    // purchaseContinuehandler = () => {
    //      console.log('continuee');

    //      const queryparam = [];
    //      for(let i in this.props.ingr){
    //         queryparam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingr[i])); // encodeURIComponent() is used to make string for url i.e to remove spaces
    //      }
    //      queryparam.push('price=' + this.state.totalPrice)
    //      const queryString = queryparam.join('&');
    //      this.props.history.push({
    //          pathname : '/checkout',
    //          search: '?' + queryString
    //      });
    //     // this.setState({ loading: true});
    //     // const finalOrder = {
    //     //     ingredients: this.props.ingr,
    //     //     price: this.state.totalPrice,
    //     //     customer : {
    //     //         name: 'Ayushi',
    //     //         address : 'xyzz',
    //     //         email: 'test@test.com',
    //     //         payment: 'cod'
    //     //     }
    //     // }
    //     // axios.post('orders.json' ,finalOrder )
    //     //     .then(response => {
    //     //         return(
    //     //             //console.log('fgtrgdg')
    //     //             this.setState({
    //     //                 loading: false,
    //     //                 purchasing :false

    //     //             })
    //     //         ); 
    //     //     })
    //     //     .catch(error => {
    //     //         return(
    //     //             this.setState({
    //     //                 loading: false,
    //     //                 purchasing :false
    //     //             })
    //     //         );
    //     //     })                     
    // }
    //.json is used for firebase 



    render(){
        const disabledInfo = {
            ...this.props.ingr
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // console.log('price');
        // console.log(this.props.price);
        // if(this.props.price > 0){
        //     this.props.mainPurchasable = true;
        // }else{
        //     this.props.mainPurchasable = false;
        // }
        let orderSummary= null;
       
        let burger = this.props.error ? <h1 style={{ textAlign : 'center'}}>ERROR</h1> : <Spinner />

        if(this.props.ingr){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ingr} />
                    <BuildControlls 
                        ingredientAdded={this.props.onIngredientAdd} 
                        ingredientRemove = {this.props.onIngredientRemove}
                        disabled= {disabledInfo}
                        price={this.props.price}
                        ordered = {this.purchasingHandler}
                        purchaseable={this.props.mainPurchasable}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                    price={this.props.price}
                    summaryIngredient={this.props.ingr}
                    purchaseCancel={this.purchaseCancelhandler}
                    purchaseContinue={this.purchaseContinuehandler} />
        }
        //  if(this.state.loading){
        //     orderSummary = <Spinner />
        // }



        return(
            <Aux>
                <Modal show={this.state.purchasing} cancelOrder = {this.purchaseCancelhandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
 
const mapStateToProps = state => {
    return{
        ingr: state.bbRed.ingredients,
        price: state.bbRed.totalPrice,
        mainPurchasable : state.bbRed.purchasable,
        error: state.bbRed.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd : (ingName) => dispatch(burgerBuilderAction.addIngrdients(ingName)),
        onIngredientRemove : (ingName) => dispatch(burgerBuilderAction.removeIngrdients(ingName)),
        initIngredients : () => dispatch(burgerBuilderAction.initIngredients())
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorhandler(BurgerBuilder , axios));