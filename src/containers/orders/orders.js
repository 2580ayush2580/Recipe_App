import React,{Component} from 'react'
import Order from '../../components/order/order'
import axios from '../../axios.orders'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res=>{
            // console.log(res.data)
            const fetchOrders=[];
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            this.setState({loading:false,orders:fetchOrders})
        })
        .catch(err=>{
            this.setState({loading:false})
        })
    }
    render(){
        // console.log(this.state.orders)
        return(
          <div>
              {this.state.orders.map(order=>{
                  return <Order price={order.price} ingredients={order.ingredients} key={order.id} />
              })
              
              }
          </div>
        )
    }
}

export default withErrorHandler(Orders,axios) ;