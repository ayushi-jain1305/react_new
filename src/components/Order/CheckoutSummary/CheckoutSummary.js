import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../Burger/UI/Button/Button';
import classes from './CheckoutSummary.css'

const CheckoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>This is the finall burger you build to purchase.</h1>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnClass="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btnClass="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;