import React, { Component } from 'react'
import Aux from '../HOC/auxes'
import BurgerComponent from '../../components/burgercomponent/burgercomponent'
import Buildcontrols from '../../components/burgercomponent/BuildControls/buildcontrols'
import Modal from '../../components/UI/modal/modal'
import OrderSummary from '../../components/burgercomponent/orderSummary/ordersummary'
import axios from '../../axios.orders'
import Spinner from '../../components/UI/spinner/spinner'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'

const Ingredient_price = {
    salad: 15,
    cheese: 10,
    meat: 20,
    bacon: 10
}

class Burger extends Component {

    state = {
        ingredients: null,
        totalPrice: 70,
        purchaseble: false,
        purchased: false,
        loading:false,
        error:false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-10446.firebaseio.com/ingredients.json')
        .then(response=>{
            console.log(response)
            this.setState({
                ingredients:response.data
            })
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                error:true
            })
        })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({ purchaseble: sum > 0 })
    }

    purchaseHandler = () => {
        this.setState({
            purchased: true
        })
    }
    purchaseCancelHandler = () => {  
        this.setState({
            purchased: false
        })
    }
    purchaseContinueHandler = () => {

        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice)
         const queryString=queryParams.join('&')    
 
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+ queryString
        })
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAdddition = Ingredient_price[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = Ingredient_price[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);

    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary=null;
        if(this.state.ingredients){
            orderSummary = <OrderSummary 
          ingredients = { this.state.ingredients }
          purchaseCancelleded = { this.purchaseCancelHandler }
          purchaseContinue = { this.purchaseContinueHandler }
          price = { this.state.totalPrice }
          /> ;
        }
         
        if(this.state.loading){
             orderSummary=<Spinner/>
        }

        let burgers=this.state.error ? <p>Ingredients Can't be Loaded</p>:<Spinner/>

        if(this.state.ingredients){
            burgers=(
                <Aux>
                    <BurgerComponent ingredients = { this.state.ingredients }
                />
                 <Buildcontrols ingredientAdded = { this.addIngredientHandler }
                   ingredientRemoved = { this.removeIngredientHandler }
                   disabled = { disableInfo }
                   ordered = { this.purchaseHandler }
                   purchaseble = { this.state.purchaseble }
                   price = { this.state.totalPrice }
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

export default withErrorHandler( Burger ,axios);