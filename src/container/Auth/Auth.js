import React , { Component } from 'react';
import Input from '../../components/Burger/UI/Input/Input';
import Button from '../../components/Burger/UI/Button/Button';
import classes from './Auth.css';
import * as actionHandler from '../../store/actions/indexAct';
import { connect } from 'react-redux';
import Spinner from '../../components/Burger/UI/Spinner/Spinner'

class Auth extends Component {
	state = {
		controls : {
			email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email Address'
                },
                value:'',
                validation : {
                    required:true,
                    isEmail : true
                },
                valid: false,
                touched: false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your password'
                },
                value:'',
                validation : {
                    required:true,
                    minlength : 6
                },
                valid: false,
                touched: false
            },
		},
		isSignup : true
	}


	checkValidity(value , rules ){
        let isValid = true;
        console.log('rules',rules);
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
            if(rules.minlength){
                isValid = value.length >= rules.minlength  && isValid;
            }
            if(rules.maxlength){
                isValid = value.length <= rules.maxlength  && isValid;
            }
            if(rules.isEmail){
                const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                isValid = pattern.test(value) && isValid;
            }
            if(rules.isNumeric){
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid;
            }
        }
       

        return isValid;
    }

    inputChangedhandler = (event , controlNames) => {
    	const updateControls = {
    		...this.state.controls , 
    		[controlNames] : {
    			...this.state.controls[controlNames],
    			value: event.target.value,
    			valid:this.checkValidity(event.target.value , this.state.controls[controlNames].validation),
    			touched:true
    		}
    	};
    	this.setState({
    		controls : updateControls
    	})
    }

    submitHandler = (event) => {
    	event.preventDefault();
    	this.props.onAuth(this.state.controls.email.value , this.state.controls.password.value , this.state.isSignup);
    }

    switchModeHandler = () => {
    	this.setState(prevState => {
    		return { isSignup : !prevState.isSignup }
    	})
    }


	render() {
		const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementArray.map(ele => (
                    <Input 
                        key = {ele.id}
                        label={ele.id}
                        elementType={ele.config.elementType} 
                        value={ele.config.value} 
                        elementConfig={ele.config.elementConfig}
                        invalid={!ele.config.valid}
                        require={ele.config.validation}
                        touched = {ele.config.touched}
                        changed={(event) => this.inputChangedhandler(event , ele.id)}  
                         />
                ) );

        if(this.props.loading){
        	form = <Spinner />
        }

        let errorMessage = null 
        if(this.props.error){
        	errorMessage = (
        		<p>Authentication Fails</p>
        	)
        }

		return(
			<div className={classes.Auth}>
				{errorMessage}
				<form onSubmit ={this.submitHandler} >
					{form}
					<Button btnClass="Success">SUBMIT</Button>
				</form>
				<Button 
				btnClass="Danger"
				clicked={this.switchModeHandler}
				>{this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.authRed.loading,
		error: state.authRed.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth : (email, password , isSignup) => dispatch(actionHandler.authInit(email, password , isSignup))
	}
}

export default connect(mapStateToProps , mapDispatchToProps)(Auth) ;