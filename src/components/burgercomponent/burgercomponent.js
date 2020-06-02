import React from 'react';
import './burgercomponent.css';
import BurgerIngredient from './burgeringrediants/burgeringredient'
const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map(element => {
        return [...Array(props.ingredients[element])].map((_, i) => {
            return <BurgerIngredient key = { element + i }
            type = { element }
            />
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p > Please Start Adding ingredients </p>
    }
    console.log(transformedIngredients)
    return (
         <div className = 'Burger' >
            <BurgerIngredient type = "bread-top" /> 
            { transformedIngredients }
             <BurgerIngredient type = "bread-bottom" />
        </div>   
    );
}

export default burger;