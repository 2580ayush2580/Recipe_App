import React from 'react'
import Logo from '../../logo/logo'
import './sidedrawer.css'
import NavigatinItems from '../navigationitems/navigationitems'
import BackDrop from '../../UI/backdrop/backdrop'
import Aux from '../../../containers/HOC/auxes'

const sideDrawer = (props) => {
    let attachedClasses = ['SideDrawer', 'Close']
    if (props.open) {
        attachedClasses = ['SideDrawer', 'Open']
    }
    return (
        <Aux>
    <BackDrop show={ props.open } clicked={ props.closed } />
    <div className={ attachedClasses.join( ' ') } onClick={props.closed}>
        <div className='sideLogo'>
            <Logo />
        </div>
        <nav>
            <NavigatinItems isAuthenticated={props.isAuth} />
        </nav>
    </div> 
</Aux>   
    );
}
export default sideDrawer;