import React from 'react'
import './input.css'

const input = (props)=>{
    let inputElement=null;
    const inputClasses=['InputElement'];
console.log(props.touched,props.shouldValidate,props.invalid)
    if(props.invalid && props.shouldValidate &&  props.touched){
        inputClasses.push('Invalid')
    }

    const classes=inputClasses.join(' ');
    console.log(classes)

    switch(props.elementType){
        case('input'):
          inputElement = <input 
          className={classes} 
          {...props.elementConfig} 
          value={props.value  }
          onChange={props.changed} />
          break;
        case('textarea'):   
          inputElement = <textarea  
          className={classes} 
          {...props.elementConfig} 
          value={props.value  }
          onChange={props.changed} />
          break;
        case('select'):   
          inputElement =
           <select  
              className={classes}
              value={props.value  } 
          onChange={props.changed}>
              {props.elementConfig.options.map(option=>{
                  return <option key={option.value} value={option.value}>
                      {option.displayValue}
                  </option>
              })} 
            </select>
          break;
        default:
            inputElement = <input  
            className={classes} 
            {...props.elementConfig} 
            value={props.value  }
          onChange={props.changed} />    
    }

    return(
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;