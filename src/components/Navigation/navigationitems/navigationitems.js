import React from 'react'
import './navigationitems.css'
import NavigationItem from './navigationitem/navigationitem'

const navigationItems = (props) => ( 
    <ul className='NavigationItems'>
    <NavigationItem link='/' > Burger Builder
    </NavigationItem>
    <NavigationItem link='/orders'> Orders
    </NavigationItem>
</ul>
);
export default navigationItems;