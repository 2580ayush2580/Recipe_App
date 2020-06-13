import React from 'react';
import './toolbar.css'
import Logo from '../../logo/logo'
import NavigationItems from '../navigationitems/navigationitems'
import DrawerToggle from '../sidedrawer/DrawerToggle/drawertoggle'

const toolbar = (props) => (
    <header className='Toolbar'>
    <DrawerToggle clicked={ props.drawerToggleClick } />
    <div className='toolLogo'>
        <Logo />
    </div>
    <nav className='Desktoponly'>
        <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
</header>
)
export default toolbar;