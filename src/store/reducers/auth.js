import * as actionTypes from '../actions/actionsTypes'

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                error:null,
                loading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                loading:false,
                token:action.idToken,
                userId:action.userId,
                error:null
            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath:action.path
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
               token:null,
               userId:null
            }
        default:
            return state;
    }
}

export default reducer;