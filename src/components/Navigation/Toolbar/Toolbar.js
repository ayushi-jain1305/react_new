import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler'

const Toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <DrawerToggler menuClose={props.menuClose}></DrawerToggler>
            <Logo />
            <nav className={classes.MobileNone}>
                <NavigationItems></NavigationItems>
            </nav>
        </header>
    );
}

export default Toolbar;