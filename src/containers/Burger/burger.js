import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../HOC/auxes'
import BurgerComponent from '../../components/burgercomponent/burgercomponent'
import Buildcontrols from '../../components/burgercomponent/BuildControls/buildcontrols'
import Modal from '../../components/UI/modal/modal'
import OrderSummary from '../../components/burgercomponent/orderSummary/ordersummary'
import axios from '../../axios.orders'
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'


class Burger extends Component {

    state = {
        purchased: false,
        
    }

    componentDidMount(){
        this.props.onInitIngredients()
        // axios.get('https://react-my-burger-10446.firebaseio.com/ingredients.json')
        // .then(response=>{
        //     console.log(response)
        //     this.setState({
        //         ingredients:response.data
        //     })
        // })
        // .catch(error=>{
        //     console.log(error)
        //     this.setState({
        //         error:true
        //     })
        // })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        return sum > 0  
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchased: true
            })
        }else {
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
      
    }
    purchaseCancelHandler = () => {  
        this.setState({
            purchased: false
        })
    }
    purchaseContinueHandler = () => {

        // const queryParams=[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price='+this.props.price)
        //  const queryString=queryParams.join('&')    
 
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+ queryString
        // })
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAdddition = Ingredient_price[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice + priceAdddition;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    // }
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = Ingredient_price[type];
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);

    // }

    render() {
        const disableInfo = { 
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary=null;
        if(this.props.ings){
            orderSummary = <OrderSummary 
          ingredients = { this.props.ings }
          purchaseCancelleded = { this.purchaseCancelHandler }
          purchaseContinue = { this.purchaseContinueHandler }
          price = { this.props.price }
          /> ;
        }
         
        // if(this.state.loading){
        //      orderSummary=<Spinner/>
        // }

        let burgers=this.props.error ? <p>Ingredients Can't be Loaded</p>:<Spinner/>

        if(this.props.ings){
            burgers=(
                <Aux>
                    <BurgerComponent ingredients = { this.props.ings}
                     />
                 <Buildcontrols ingredientAdded = { this.props.onIngredientsAddded}
                   ingredientRemoved = { this.props.onIngredientsRemoved }
                   disabled = { disableInfo }
                   ordered = { this.purchaseHandler }
                   purchaseble = { this.updatePurchaseState(this.props.ings) }
                   price = { this.props.price }
                   isAuth={this.props.isAuthenticated}
                /> 
                </Aux>
            )
        }
       
        return ( <Aux >
            <Modal show = { this.state.purchased }
            modalClosed = { this.purchaseCancelHandler } >
             {orderSummary}
             </Modal>
            {burgers}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{

    return{
         ings:state.burgerBuilder.ingredients,
         price:state.burgerBuilder.totalPrice,
         error:state.burgerBuilder.error,
         isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {

    return{
        onIngredientsAddded: (ingsName) => dispatch(actions.addIngredient(ingsName)),
        onIngredientsRemoved: (ingsName) => dispatch(actions.removeIngredient(ingsName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path)) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( Burger ,axios));