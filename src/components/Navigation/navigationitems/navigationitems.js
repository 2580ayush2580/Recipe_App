import React from 'react'
import './navigationitems.css'
import NavigationItem from './navigationitem/navigationitem'

const navigationItems = (props) => ( 
    <ul className='NavigationItems'>
    <NavigationItem link='/' active> Burger Builder
    </NavigationItem>
    <NavigationItem link='/'> Checkout
    </NavigationItem>
</ul>
);
export default navigationItems;