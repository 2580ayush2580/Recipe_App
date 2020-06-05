import React from 'react';
import Layout from './components/layout/layout';
import Burger from './containers/Burger/burger';
import Checkout from './containers/checkout/checkout';
import {Route, Switch} from 'react-router-dom'
import Orders from './containers/orders/orders'

function App() {
  return (
    <div>
    <Layout>
     <Switch>
      <Route path='/checkout' component={Checkout} />
      <Route path='/orders' component={Orders} />
      <Route path='/'exact component={Burger} />
     </Switch>
    </Layout> 
    </div>   
  );
}

export default App;
