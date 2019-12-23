import React from 'react';
import classes from './BuildControlls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad' , type: 'salad'} ,
    {label: 'Cheese' , type: 'cheese'} ,
    {label: 'Bacon' , type: 'bacon'} ,
    {label: 'Meat' , type: 'meat'} 
];

const BuildControlls = (props) => {
    return (
        <div className={classes.BuildControlls}>
            <h2>Current Price: &#8377;{props.price}</h2>
            {controls.map(ctrl => {
                return <BuildControl 
                            key={ctrl.label} 
                            label={ctrl.label}
                            added={() => props.ingredientAdded(ctrl.type)}
                            remove={() => props.ingredientRemove(ctrl.type)}
                            disabled={props.disabled[ctrl.type] }
                        />
            })}
           <button 
                onClick={props.ordered} 
                className={classes.OrderButton} 
                disabled={!props.purchaseable}
            >{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )
}

export default BuildControlls;