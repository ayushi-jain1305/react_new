import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../UI/Button/Button'

const OrderSummary = (props) => {
    const summaryIngredient =Object.keys(props.summaryIngredient)
        .map(igkey => {
            return(
                <li key={igkey}>
                    <span style={{ textTransform : "capitalize" }}>{igkey}</span> : {props.summaryIngredient[igkey]}
                </li>
            );
        })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:-</p>
            <ul>
               {summaryIngredient} 
            </ul>
    <h2>Total Price : {props.price}</h2>
            <Button btnClass="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnClass="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
}

export default OrderSummary;