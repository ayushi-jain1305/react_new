import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControlls from '../../components/Burger/BuildControlls/BuildControlls'
import Modal from '../../components/Burger/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Burger/UI/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorhandler/withErrorhandler';

const INGREDIENT_PRICE = {
    cheese : 30 , 
    salad: 20 , 
    bacon : 70 , 
    meat: 80
}

class BurgerBuilder extends Component {
    state = {
        ingredients :null,
        totalPrice: 50 ,
        purchaseable: true , 
        purchasing : false , 
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients : response.data});
            })
            .catch(error => {
                this.setState({error : true})
            })
    }
    
    addIngredientHandler = (type) => {
        const countIngredient = this.state.ingredients[type] + 1;
        const updateIngredient = {
            ...this.state.ingredients
        }
        updateIngredient[type] = countIngredient;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState({
            ingredients : updateIngredient ,
            totalPrice: newPrice
        })
        this.updatePurchaseHandler(newPrice);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if( oldCount <= 0){
            return;
        }
        const countIngredient = oldCount - 1;
        const updateIngredient = {
            ...this.state.ingredients
        }
        updateIngredient[type] = countIngredient;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({
            ingredients : updateIngredient ,
            totalPrice: newPrice
        })
        this.updatePurchaseHandler(newPrice);
    }

    updatePurchaseHandler = (newPrice) => {
        this.setState({
            purchaseable: newPrice > 0
        })
    }

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
         console.log('continuee');

         const queryparam = [];
         for(let i in this.state.ingredients){
            queryparam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i])); // encodeURIComponent() is used to make string for urm i.e to remove spaces
         }
         queryparam.push('price=' + this.state.totalPrice)
         const queryString = queryparam.join('&');
         this.props.history.push({
             pathname : '/checkout',
             search: '?' + queryString
         });
        // this.setState({ loading: true});
        // const finalOrder = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer : {
        //         name: 'Ayushi',
        //         address : 'xyzz',
        //         email: 'test@test.com',
        //         payment: 'cod'
        //     }
        // }
        // axios.post('orders.json' ,finalOrder )
        //     .then(response => {
        //         return(
        //             //console.log('fgtrgdg')
        //             this.setState({
        //                 loading: false,
        //                 purchasing :false

        //             })
        //         ); 
        //     })
        //     .catch(error => {
        //         return(
        //             this.setState({
        //                 loading: false,
        //                 purchasing :false
        //             })
        //         );
        //     })                     
    }
    //.json is used for firebase 
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary= null;
       
        let burger = this.state.error ? <h1 style={{ textAlign : 'center'}}>ERROR</h1> : <Spinner />

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients} />
                    <BuildControlls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemove = {this.removeIngredientHandler}
                        disabled= {disabledInfo}
                        price={this.state.totalPrice}
                        ordered = {this.purchasingHandler}
                        purchaseable={this.state.purchaseable}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                    price={this.state.totalPrice}
                    summaryIngredient={this.state.ingredients}
                    purchaseCancel={this.purchaseCancelhandler}
                    purchaseContinue={this.purchaseContinuehandler} />
        }
         if(this.state.loading){
            orderSummary = <Spinner />
        }



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

export default withErrorhandler(BurgerBuilder , axios);