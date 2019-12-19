import * as action_Types from './actions';

const initialState = {
    ingredients: {
        salad: 0 ,
        cheese:0,
        meat:0,
        bacon:0
    },
    totalPrice : 0,
    purchasable: false
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
                purchasable : (state.totalPrice + INGREDIENT_PRICE[action.ingredientName]) > 0
                
            };
        case action_Types.REMOVE_INGREDIENT :
            return{
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                purchasable : (state.totalPrice - INGREDIENT_PRICE[action.ingredientName]) > 0
            };
        default:
            return state
    }
    
}


export default reducer;