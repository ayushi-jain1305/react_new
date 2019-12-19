import React , {Component} from 'react';
import Button from '../../../components/Burger/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/Burger/UI/Spinner/Spinner';
import Input from '../../../components/Burger/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component{
    state={
        orderForm: {
            name:{
                elementType:'input',
                elementConfig:{
                    type:'input',
                    placeholder:'Your input'
                },
                value:'',
                validation : {
                    required:true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'input',
                    placeholder:'Street'
                },
                value:'',
                validation : {
                    required:true
                },
                valid: false,
                touched: false
            },
            zip:{
                elementType:'input',
                elementConfig:{
                    type:'input',
                    placeholder:'ZIP code'
                },
                value:'',
                validation : {
                    required:true,
                    minlength : 5 , 
                    maxlength : 5
                },
                valid: false,
                touched: false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'input',
                    placeholder:'Your Country'
                },
                value:'',
                validation : {
                    required:true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your mail'
                },
                value:'',
                validation : {
                    required:true
                },
                valid: false,
                touched: false
            },
            phone:{
                elementType:'input',
                elementConfig:{
                    type:'input',
                    placeholder:'Your phone'
                },
                value:'',
                valid:true
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fatest' , displayValue:'Fastest'},
                        {value:'cheapest' , displayValue:'cheapest'}
                    ]
                },
                value:'cheapest',
                valid:true
                
            },
        },
        isFormValid : false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true});
        const contactDetail = {};
        for(let key in this.state.orderForm){
            contactDetail[key] = this.state.orderForm[key].value;
        }
        // for(let key in this.state.orderForm){
        //     contactDetail.push({
        //         label:key , 
        //         value: this.state.orderForm[key].value
        //     })
        // }
        const finalOrder = {
            ingredients: this.props.ingr,
            price: this.props.price,
            orderData : contactDetail
        }
        axios.post('/orders.json' ,finalOrder )
            .then(response => {
                    //console.log('fgtrgdg')
                    this.setState({loading: false});
                    this.props.history.push('/orders');
               
            })
            .catch(error => {
                    this.setState({ loading: false })
            })  
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
        }
       

        return isValid;
    }

    inputChangedhandler = (event , id) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updateFormElement = {
            ...updateOrderForm[id]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value , updateFormElement.validation);
        updateFormElement.touched= true;
        updateOrderForm[id] = updateFormElement;
        let formValid = true;
        for(let key in updateOrderForm){
            formValid = updateOrderForm[key].valid && formValid
        }
        console.log('formValid',formValid);
        this.setState({ orderForm:updateOrderForm  , isFormValid : formValid})
    
    }

    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }



        let form = (
            <form>
                { formElementArray.map(ele => (
                    <Input 
                        key = {ele.id}
                        label={ele.id}
                        elementType={ele.config.elementType} 
                        value={ele.config.value} 
                        elementConfig={ele.config.elementConfig}
                        invalid={!ele.config.valid}
                        require={ele.config.validation}
                        touched = {ele.config.touched}
                        changed={(event) => this.inputChangedhandler(event , ele.id)}  />
                ) )}
                {/*<Input elementType="..." elementConfig="..." value="..." />
                <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                <Input inputtype="input" type="text" name="street" placeholder="Your Address" />
                <Input inputtype="input" type="text" name="postal" placeholder="Your Postal code" />*/}
                <Button disableBtn={!this.state.isFormValid} btnClass="Success" clicked={this.orderHandler} >ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className={classes.ContactName}>
                <h4>Please Enter your details</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingr: state.ingredients,
        price:state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);
