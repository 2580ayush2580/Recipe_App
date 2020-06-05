import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/order/checkoutsummary/checkoutsummary'
import ContactData from '../../containers/checkout/contactdata/contactdata'

class Checkout extends Component{
    state={
        ingredients:null,
        totalPrice:null
    }
    
    componentWillMount(){
        const query=new URLSearchParams(this.props.location.search)
        // console.log(query.entries())
        const ingredients = {};
        let price=0;
        for(let param of query.entries()){
            if(param[0]==='price'){
                price=param[1]
            }
            else{
            ingredients[param[0]]= +param[1]
            }
            // console.log(param)
        }
        this.setState({
            ingredients:ingredients,
            totalPrice:price
        })
    }
    
    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    
    render(){
        // console.log(this.state.ingredients)

        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}
                 />
                 <Route path={this.props.match.path+'/contact-data'} render={()=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} />)} />
            </div>
        )
    }
}

export default Checkout;                                                                                 