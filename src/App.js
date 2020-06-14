import React, {Component} from 'react';
import Layout from './components/layout/layout';
import Burger from './containers/Burger/burger';
import Checkout from './containers/checkout/checkout';
import {Route, Switch,withRouter, Redirect} from 'react-router-dom'
import Orders from './containers/orders/orders'
import Auth from './containers/auth/auth'
import Logout from './containers/auth/logout/logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup()
  }
  
  render(){
   
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/'exact component={Burger} />
        <Redirect to='/' />
      </Switch>
    )

    if(this.props.isAuthenticated){
      routes=(
        <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/auth' component={Auth} />
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
