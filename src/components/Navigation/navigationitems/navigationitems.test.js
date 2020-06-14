import {configure, shallow} from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './navigationitems'
import NavigationItem from './navigationitem/navigationitem'

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
     
    let wrapper; 

    beforeEach(()=>{
        wrapper = shallow (<NavigationItems/>)
    })

    it('should render two navigationItems if not authenticated', () => {
        
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    });
    it('should render three navigationItems if  authenticated', () => {
        wrapper.setProps({isAuthenticated:true})
        // wrapper = shallow (<NavigationItems isAuthenticated/>)
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });
    it('Logout Case', () => {
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
    });
    
});
