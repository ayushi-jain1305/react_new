import React , {Component} from 'react';
import Button from '../../../components/Burger/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/Burger/UI/Spinner/Spinner';
import Input from '../../../components/Burger/UI/Input/Input'

class ContactData extends Component{
    state={
        orderForm: {
            name:{
                elementType:'input',
                elementConfig:{
                    type:'input',
                    placeholder:'Your input'
                },
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'input',
                    placeholder:'Street'
                },
                value:''
            },
            zip:{
                elementType:'input',
                elementConfig:{
                    type:'input',
                    placeholder:'ZIP code'
                },
                value:''
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'input',
                    placeholder:'Your Country'
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your mail'
                },
                value:''
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fatest' , displayValue:'Fastest'},
                        {value:'cheapest' , displayValue:'cheapest'}
                    ]
                },
                value:''
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true});
        const finalOrder = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            
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
                    <Input elementType={ele.config.elementType} value={ele.config.value} elementConfig={ele.config.elementConfig}  />
                ) )}
                {/*<Input elementType="..." elementConfig="..." value="..." />
                <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                <Input inputtype="input" type="text" name="street" placeholder="Your Address" />
                <Input inputtype="input" type="text" name="postal" placeholder="Your Postal code" />*/}
                <Button btnClass="Success" clicked={this.orderHandler} >ORDER</Button>
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

export default ContactData;