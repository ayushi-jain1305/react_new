import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';

class Layout extends Component{
    state = {
        showSidedrawer : false
    }

    sideDrawerCloseHandler = () => {
        return(
            this.setState((prevState) => {
               return { showSidedrawer : !prevState.showSidedrawer };
            })
        );
    }

    // sideDrawerOpenHandler = () => {
    //     return(
    //         this.setState({
    //             showSidedrawer : true
    //         })
    //     );
    // }

    render(){
        return(
            <Aux>
                <Toolbar 
                    isAuth ={this.props.isAuth}
                    menuClose = {this.sideDrawerCloseHandler}></Toolbar>
                <SideDrawer 
                    isAuth ={this.props.isAuth}
                    open={this.state.showSidedrawer} 
                    closed={this.sideDrawerCloseHandler}>

                </SideDrawer>
                <main className={classes.Layout}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

const mapStateToProps = state => {
    return {
        isAuth : state.authRed.token !== null
    }
}

export default connect(mapStateToProps)(Layout);