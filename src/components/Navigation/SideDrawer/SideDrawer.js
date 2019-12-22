import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../Burger/UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary'

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer , classes.Open];
    if(!props.open){
         attachedClasses = [classes.SideDrawer , classes.Close];
    }
    return(
        <Aux>
            <Backdrop show={props.open}  cancelOrder={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.smallLogo}>
                    <Logo></Logo>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} ></NavigationItems>
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;