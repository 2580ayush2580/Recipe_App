import React, {Component} from 'react'
import Input from '../../components/UI/input/input'
import Button from '../../components/UI/button/button'
import { connect } from 'react-redux'
import './auth.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/spinner/spinner'
import {Redirect} from 'react-router-dom'

class Auth extends Component {
    state={
        controls:{
            email:{   
                elementType:'input',
                elementConfig:{ 
                    type:'email',
                    placeholder:'Enter Your Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{ 
                    type:'password',
                    placeholder:'Enter Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            },
        },
        isSignUp:true
    }
    
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/' ){
            this.props.onSetAuthRedirectPath()
        }
    }

    checkValidity(value,rules){
        let isValid=true;
 
        if(rules.required){
            isValid=value.trim() !== ''&& isValid;
        }
 
        if(rules.minLength){
            isValid=value.length>=rules.minLength&&isValid;
        }
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength&&isValid;
        }
 
        return isValid;
    }

    
   inputChangeHandeler = (event,controlName) =>{
       const updatedControls = {
           ...this.state.controls,
           [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
           }
       };
       this.setState({
           controls:updatedControls
       })
   }

   submitHandler = (event) => {
       event.preventDefault()
       this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
   }

   switchAuthModeHandler = () => {
       this.setState(prevState => {
           return {isSignUp : !prevState.isSignUp}
       })
   }

    render(){
        const formElementArray=[];   
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form=formElementArray.map(formElement =>(
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangeHandeler(event,formElement.id)}
            />
        ));

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;

        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
            <div className='Auth'>
            {authRedirect}
            {errorMessage}
                <form action="" onSubmit={this.submitHandler}>
                    {form}
                    <Button btntype='Success'>
                        SUBMIT
                    </Button>
                </form>
                <Button
                 clicked={this.switchAuthModeHandler}
                 btntype='Danger'>
                     Switch To   {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                    </Button>
            </div>
        )
    }
}


const mapStateToProps = state =>{

    return{
        loading: state.auth.loading,
        error:state.auth.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {

    return{
       onAuth : (email, password,isSignUp) => dispatch(actions.auth(email, password,isSignUp)),
       onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth); 