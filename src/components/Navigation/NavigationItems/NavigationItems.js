import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {/* <NavigationItem link="/checkout" >Checkout</NavigationItem> */}
            <NavigationItem link="/orders" >Orders</NavigationItem>
            {!props.isAuth 
            	? <NavigationItem link="/auth" >Auth</NavigationItem>
            	: <NavigationItem link="/logout" >Logout</NavigationItem> } 

        </ul>
    );
}

export default NavigationItems;