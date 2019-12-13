import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'


const Burger = ( props ) => {
    let transformedIngredients = Object.keys( props.ingredients )
        .map(igkey => {
            return [...Array( props.ingredients[igkey] )].map((_, i) => {
                return <BurgerIngredient type={igkey} key={igkey+i} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        },[]);
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients !!</p>
    }
    console.log(transformedIngredients);

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger;

// state = {
//     ingredients :{
//         salad: 2,
//         cheese:2,
//         bacon:1
//     }
// }
