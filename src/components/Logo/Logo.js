import React from 'react';
import Burgerlogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const Logo = (props) => {
    return(
        <div className={classes.Logo}>
            <img src={Burgerlogo} />
        </div>
    );
}

export default Logo