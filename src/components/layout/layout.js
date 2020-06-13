import React, { Component } from 'react';
import { connect } from 'react-redux'
import Aux from '../../containers/HOC/auxes';
import Toolbar from '../Navigation/Toolbar/toolbar'
import SideDrawer from '../Navigation/sidedrawer/sidedrawer'
import './layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandel = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    sideDrawerTogglerHandel = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return ( <Aux>
            <Toolbar
             isAuth={this.props.isAuthenticated}
             drawerToggleClick={ this.sideDrawerTogglerHandel } />
            <SideDrawer isAuth={this.props.isAuthenticated} open={ this.state.showSideDrawer } closed={ this.sideDrawerClosedHandel } />
        
            <main className="content"> { this.props.children }
            </main>
        </Aux>
        )
    }
}


const mapStateToProps = state =>{
    return{
        isAuthenticated : state.auth.token !== null
    }
}

// const mapDispatchToProps = dispatch => {

//     return{
//        onFetchOrder: (token)=>dispatch(actions.fetchOrder(token))
//     }
// }

export default connect(mapStateToProps)(Layout);