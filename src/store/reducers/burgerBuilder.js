import * as action_Types from '../actions/actionTypes'; 

const initialState = {
    ingredients: null,
    totalPrice : 50,
    purchasable: true ,
    error: false,
    resetIngredients : false
}

const INGREDIENT_PRICE = {
    cheese : 30 , 
    salad: 20 , 
    bacon : 70 , 
    meat: 80 
}

const reducer = (state = initialState, action) => {
    console.log('hereree');
    console.log(state.totalPrice);
    switch(action.type) {
        case action_Types.ADD_INGREDIENT :
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                purchasable : (state.totalPrice + INGREDIENT_PRICE[action.ingredientName]) > 0,
                resetIngredients: true
                
            };
        case action_Types.REMOVE_INGREDIENT :
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                purchasable : (state.totalPrice - INGREDIENT_PRICE[action.ingredientName]) > 0,
                resetIngredients: true
            };
        case action_Types.SET_INGREDIENTS :
            return {
                ...state,
                ingredients : action.ingredients,
                error : false,
                totalPrice: 50,
                resetIngredients: false
            };

        case action_Types.FETCH_INGREDIENTS_FAILED :
            return {
                ...state,
                error : true
            };

        default:
            return state
    }
    
}


export default reducer;