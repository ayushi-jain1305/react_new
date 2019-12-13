import React , { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControlls from '../../components/Burger/BuildControlls/BuildControlls'
import Modal from '../../components/Burger/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICE = {
    cheese : 30 , 
    salad: 20 , 
    bacon : 70 , 
    meat: 80
}

class BurgerBuilder extends Component {
    state = {
        ingredients :{
            salad: 1,
            cheese:1,
            bacon:0,
            meat:0
        },
        totalPrice: 50 ,
        purchaseable: true , 
        purchasing : false
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
       alert('continuee');
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} cancelOrder = {this.purchaseCancelhandler}>
                    <OrderSummary 
                    price={this.state.totalPrice}
                    summaryIngredient={this.state.ingredients}
                    purchaseCancel={this.purchaseCancelhandler}
                    purchaseContinue={this.purchaseContinuehandler} />
                </Modal>
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
    }
}

export default BurgerBuilder;