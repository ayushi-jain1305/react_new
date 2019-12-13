import React from 'react';
import classes from './DrawerToggler.css';

const DrawerToggler = (props) => {
    return(
        <div className={classes.DrawerToggle} onClick={props.menuClose}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default DrawerToggler;