import * as actionTypes from '../actions/actionsTypes'

const initialState = {
    ingredients : null ,
    totalPrice : 70,
    error:false,
    building:false
}  

const Ingredient_price = {
    salad: 15,
    cheese: 10,
    meat: 20,
    bacon: 10
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                building:true,
                ingredients:{
                    ...state.ingredients,
                     [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                },
                totalPrice:state.totalPrice + Ingredient_price[action.ingredientName]

            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                building:true,
                ingredients:{
                    ...state.ingredients,
                     [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                },
                totalPrice:state.totalPrice - Ingredient_price[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                building:false,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat,
                },
                totalPrice:70,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
        default:
            return state;    
    }
    
}

export default reducer;