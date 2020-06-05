import React , {Component} from 'react'
import Button from '../../../components/UI/button/button' 
import Spinner from '../../../components/UI/spinner/spinner'
import './contactdata.css'
import axios from '../../../axios.orders'
import {withRouter} from 'react-router-dom'
class ContactData extends Component {
   state={
       name:'',
       email:'',
       address:{
             house_no:'',
             street:'',
             pinCode:'',
             country:'India'
       },
       loading:false
   }

   orderHandeler=(event)=>{
       event.preventDefault()
       console.log(this.props.ingredients)
     this.setState({
             loading:true
         })

        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'Ayush Kumar',
                address:{
                    house_no:'466/173',
                    street:'lajpatnagar',
                    pinCode:'226003',
                    country:'India'
                },
                email:'2580ayush2580@gmail.com',
            }
        }
        axios.post('/orders.json',order)
        .then(response=>{
            // console.log(response)
            this.setState({
                loading:false,
            })
            this.props.history.push('/');
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                loading:false,
            })
        });
   }

   render(){

    let form=(
        <form action="">
                   <input className='Input' type="text" name='name' placeholder='Enter Your Name' />
                   <input className='Input' type="email" name='email' placeholder='Enter Your Email' />
                   <input className='Input' type="text" name='house_no' placeholder='Enter Your House no.' />
                   <input className='Input' type="text" name='street' placeholder='Enter Your Street' />
                   <input className='Input' type="text" name='pincode' placeholder='Enter Your Pincode' />
               </form>
    )
    if(this.state.loading){
        form=<Spinner/>
    }

       return(
           <div className='ContactData'>
               <h4>Enter Your Contact Data</h4>
               {form}
               <Button clicked={this.orderHandeler} btntype='Success'>ORDER NOW</Button>
           </div>
       )
   }
}

export default withRouter(ContactData);