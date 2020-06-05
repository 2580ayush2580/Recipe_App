import React from 'react'
import './checkoutsummary.css'
import Button from '../../UI/button/button'
import BurgerComponent from '../../burgercomponent/burgercomponent'

const checkoutsummary=(props)=>{
    return(
        <div className='CheckoutSummary'>
            <h1>We Hope You Enjoy Burger</h1>
             <div style={{width:'100%',margin:'auto'}}>
             <BurgerComponent ingredients={props.ingredients}/>
            </div>
            <Button 
               btntype='Danger'
               clicked={props.checkoutCancel}>CANCEL</Button>
            <Button  
               btntype='Success'
               clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    )
}

export default checkoutsummary;
