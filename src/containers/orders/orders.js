import React,{Component} from 'react'
import Order from '../../components/order/order'
import axios from '../../axios.orders'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/spinner/spinner'

class Orders extends Component{
    // state={
    //     orders:[],
    //     loading:true
    // }
    componentDidMount(){
        this.props.onFetchOrder()
        // axios.get('/orders.json')
        // .then(res=>{
        //     // console.log(res.data)
        //     const fetchOrders=[];
        //     for(let key in res.data){
        //         fetchOrders.push({
        //             ...res.data[key],
        //             id:key
        //         })
        //     }
        //     this.setState({loading:false,orders:fetchOrders})
        // })
        // .catch(err=>{
        //     this.setState({loading:false})
        // })
    }
    render(){
        let order = <Spinner/>
        if(!this.props.loading){
            order=this.props.orders.map(order=>{
                    return <Order price={order.price} ingredients={order.ingredients} key={order.id} />
                })
        }
        // console.log(this.state.orders)
        return(
          <div>
              {order}
          </div>
        )
    }
}


const mapStateToProps = state =>{
    return{
       orders:state.order.orders,
       loading : state.order.loading
    }
}

const mapDispatchToProps = dispatch => {

    return{
       onFetchOrder: ()=>dispatch(actions.fetchOrder())
    }
}


export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios)) ;