import {Burger} from './burger'

import {configure, shallow} from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import BuildControls from '../../components/burgercomponent/BuildControls/buildcontrols'

configure({adapter: new Adapter()})

describe('<Burger />', () => {

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<Burger onInitIngredients={()=>{}} />)
    })

    it('should render <BuildControls/> when receiving ingredients', () => {
        wrapper.setProps({ings:{Salad:0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
    

});
