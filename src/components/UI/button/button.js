import React from 'react'
import './button.css'
const button = (props) => {
        return ( <button className = {
                ['Button', [props.btntype]].join(' ') }
            onClick = { props.clicked }
            disabled={props.disabled} > { props.children } </button>)
        }
        export default button;