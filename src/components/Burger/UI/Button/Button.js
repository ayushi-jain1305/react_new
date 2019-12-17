import React from 'react';
import classes from  './Button.css';

const Button = (props) => {
    return(
        <button disabled={props.disableBtn} className={[ classes.Button , classes[props.btnClass]].join(' ') }
            onClick={props.clicked}
        >{props.children}</button>
    );
}

export default Button; 