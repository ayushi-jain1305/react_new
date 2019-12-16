import React , {Component} from 'react';
import Button from '../../../components/Burger/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/Burger/UI/Spinner/Spinner'

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address: {
            street:'',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true});
        const finalOrder = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer : {
                name: 'Ayushi',
                address : 'xyzz',
                email: 'test@test.com',
                payment: 'cod'
            }
        }
        axios.post('/orders.json' ,finalOrder )
            .then(response => {
                    //console.log('fgtrgdg')
                    this.setState({loading: false});
                    this.props.history.push('/');
               
            })
            .catch(error => {
                    this.setState({ loading: false })
            })  
    }

    render(){
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Your Address" />
                <input type="text" name="postal" placeholder="Your Postal code" />
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