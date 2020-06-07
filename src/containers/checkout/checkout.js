import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/order/checkoutsummary/checkoutsummary'
import ContactData from '../../containers/checkout/contactdata/contactdata'
import { connect } from 'react-redux'

class Checkout extends Component{

    // state={
    //     ingredients:null,
    //     totalPrice:null
    // }
    
    // componentWillMount(){
    //     const query=new URLSearchParams(this.props.location.search)
    //     // console.log(query.entries())
    //     const ingredients = {};
    //     let price=0;
    //     for(let param of query.entries()){
    //         if(param[0]==='price'){
    //             price=param[1]
    //         }
    //         else{
    //         ingredients[param[0]]= +param[1]
    //         }
    //         // console.log(param)
    //     }
    //     this.setState({
    //         ingredients:ingredients,
    //         totalPrice:price
    //     })
    // }
    
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
                ingredients={this.props.ings}
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}
                 />
                 <Route path={this.props.match.path+'/contact-data'} component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);                                                                                 