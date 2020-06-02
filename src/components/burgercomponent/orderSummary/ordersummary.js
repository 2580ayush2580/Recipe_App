import React from 'react'
import Aux from '../../../containers/HOC/auxes'
import Button from '../../UI/button/button'
const orderSummary = (props) => {
        const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
                return ( <li key={ igKey }>
                    <span style={ { textTransform: 'capitalize' } }> { igKey }
                        </span>: { props.ingredients[igKey] }
                </li>) })
                 return (
                <Aux>
                    <h3> Your Order
                    </h3>
                    <p> This is your Burger with following ingredients
                    </p>
                    <ul> { ingredientsSummary }
                    </ul>
                    <p>
                        <strong> Total Price: { props.price }
                                                                    </strong>
                    </p>
                    <p> Continue to Buy ?
                    </p>
                    <Button btntype="Danger" clicked={ props.purchaseCancelleded }> Cancel
                    </Button>
                    <Button btntype="Success" clicked={ props.purchaseContinue }> Continue
                    </Button>
                
                </Aux>
            )

        }
        export default orderSummary;