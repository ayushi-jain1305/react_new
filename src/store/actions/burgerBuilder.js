import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngrdients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngrdients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (initIngredients) => {
    return {
       type : actionTypes.SET_INGREDIENTS,
       ingredients: initIngredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-project-react-4c33a.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
               dispatch(fetchIngredientsFailed());
            })
    };
};