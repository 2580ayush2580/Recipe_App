import React from 'react';
import './buildcontrols.css';
import BuildControl from './buildcontrol/buildcontrol';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className='buildcontrols'>
    <p> Current Price:
        <strong> { props.price.toFixed() } Rupees
            </strong>
    </p> { controls.map((ctrl) => { 
           return <BuildControl key={ ctrl.label } label={ ctrl.label } removed={ ()=> props.ingredientRemoved(ctrl.type) } added = { () => props.ingredientAdded(ctrl.type) } disableded = { props.disabled[ctrl.type] } /> }) }
        <button className='OrderButton' disabled={ !props.purchaseble } onClick={ props.ordered }> {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
                        </button>

</div>
)
export default buildControls;