import React, { Component } from 'react'
import Aux from '../HOC/auxes'
import BurgerComponent from '../../components/burgercomponent/burgercomponent'
import Buildcontrols from '../../components/burgercomponent/BuildControls/buildcontrols'
import Modal from '../../components/UI/modal/modal'
import OrderSummary from '../../components/burgercomponent/orderSummary/ordersummary'

const Ingredient_price = {
    salad: 15,
    cheese: 10,
    meat: 20,
    bacon: 10
}

class Burger extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 70,
        purchaseble: false,
        purchased: false
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

        alert('Thanks For Buying Burger. We received your order!');

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
        return ( <Aux >
            <Modal show = { this.state.purchased }
            modalClosed = { this.purchaseCancelHandler } >
            <OrderSummary ingredients = { this.state.ingredients }
            purchaseCancelleded = { this.purchaseCancelHandler }
            purchaseContinue = { this.purchaseContinueHandler }
            price = { this.state.totalPrice }
            />  </Modal>
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
        );
    }
}

export default Burger;