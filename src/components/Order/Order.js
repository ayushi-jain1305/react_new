import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    const listingredients = [];
    for(let ingredientname in props.ingredients){
        listingredients.push({
            name: ingredientname , 
            amt : props.ingredients[ingredientname]
        })
    }
    console.log('listingredients');
    console.log(listingredients);

    const output = listingredients.map(ig => {
    return <span key={ig.name}>{ig.name}({ig.amt})</span>
    })

    return(
        <div className={classes.Order}>
            <p>Ingredients : {output} </p>
            <p>price : Rs {props.price} </p>
        </div>
    );
}

export default Order;