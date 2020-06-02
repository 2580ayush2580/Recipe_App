import React, { Component } from 'react';
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
            <Toolbar drawerToggleClick={ this.sideDrawerTogglerHandel } />
            <SideDrawer open={ this.state.showSideDrawer } closed={ this.sideDrawerClosedHandel } />
        
            <main className="content"> { this.props.children }
            </main>
        </Aux>
        )
    }
}

export default Layout;