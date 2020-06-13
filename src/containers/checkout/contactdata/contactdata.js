import React , {Component} from 'react'
import Button from '../../../components/UI/button/button' 
import Spinner from '../../../components/UI/spinner/spinner'
import './contactdata.css'
import axios from '../../../axios.orders'
// import {withRouter} from 'react-router-dom'
import Input from '../../../components/UI/input/input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
   state={
       orderForm:{
            name:{
                elementType:'input',
                elementConfig:{ 
                    type:'text',
                    placeholder:'Enter Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Enter Your Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            house_no:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter Your House No.'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter Your Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            pinCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter Your Pin Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter Your Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deleiveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                ]
                },
                value:'',
                valid:true,
                validation:{}
            }
       },
       isFormValid:false
   }

   orderHandeler=(event)=>{
       event.preventDefault()
    //    console.log(this.props.ingredients)
    const formData={};
    for(let formElementIdentifier in this.state.orderForm){
        formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
    }
    //  this.setState({
    //          loading:true 
    //      })

        const order={
            ingredients:this.props.ings,
            price:this.props.price,
           orderData:formData
        }

        this.props.onOrderBurger(order,this.props.token)
       
   }

   checkValidity(value,rules){
       let isValid=true;

       if(rules.required){
           isValid=value.trim() !== ''&& isValid;
       }

       if(rules.minLength){
           isValid=value.length>=rules.minLength&&isValid;
       }
       if(rules.maxLength){
           isValid=value.length<=rules.maxLength&&isValid;
       }

       return isValid;
   }

   inputChangeHandeler = (event,formIdentifier) =>{
    //    console.log(event.target.value)
    // console.log(formIdentifier)
    const updatedOrderForm={
        ...this.state.orderForm
    }
    const updateFormElement={
        ...updatedOrderForm[formIdentifier]
    }
    updateFormElement.value=event.target.value;
    updateFormElement.valid=this.checkValidity(updateFormElement.value,updateFormElement.validation)
    updateFormElement.touched=true;
    updatedOrderForm[formIdentifier]=updateFormElement;
    // console.log(updateFormElement)
    let isFormValid=true;
    for(let inputIdentifier in updatedOrderForm){
        isFormValid=updatedOrderForm[inputIdentifier].valid && isFormValid
    }
    this.setState({
        orderForm:updatedOrderForm ,
        isFormValid:isFormValid
    })

   }

   render(){
       const formElementArray=[];
       for(let key in this.state.orderForm){
           formElementArray.push({
               id:key,
               config:this.state.orderForm[key]
           })
       }

    let form=(
        <form onSubmit={this.orderHandeler}>
                  {formElementArray.map(formElement=>{
                     return <Input
                          key={formElement.id}
                          elementType={formElement.config.elementType}
                          elementConfig={formElement.config.elementConfig}
                          value={formElement.config.value}
                          invalid={!formElement.config.valid}
                          shouldValidate={formElement.config.validation}
                          touched={formElement.config.touched}
                          changed={(event)=>this.inputChangeHandeler(event,formElement.id)}
                      />
                  })}
                <Button btntype='Success' disabled={!this.state.isFormValid} >ORDER NOW</Button>
               </form>
    )
    if(this.props.loading){
        form=<Spinner/>
    }

       return(
           <div className='ContactData'>
               <h4>Enter Your Contact Data</h4>
               {form}
           </div>
       )
   }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{ 
        onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));

