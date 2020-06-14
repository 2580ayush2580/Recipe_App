import React, {Component} from 'react';
import Layout from './components/layout/layout';
import Burger from './containers/Burger/burger';
import {Route, Switch,withRouter, Redirect} from 'react-router-dom'
import Logout from './containers/auth/logout/logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './containers/HOC/asyncComponent'

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/checkout/checkout')
})
const asyncAuth = asyncComponent(()=>{
  return import('./containers/auth/auth')
})
const asyncOrder = asyncComponent(()=>{
  return import('./containers/orders/orders')
})

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup()
  }
  
  render(){
   
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/'exact component={Burger} />
        <Redirect to='/' />
      </Switch>
    )

    if(this.props.isAuthenticated){
      routes=(
        <Switch>
        <Route path='/checkout' component={asyncCheckout} />
        <Route path='/orders' component={asyncOrder} />
        <Route path='/auth' component={asyncAuth} />
        <Route path='/logout' component={Logout} />
        <Route path='/'exact component={Burger} />
        <Redirect to='/' />
       </Switch>
      )
    }

    return (
      <div>
      <Layout>
      {routes}
      </Layout> 
      </div>   
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : ()=>dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
