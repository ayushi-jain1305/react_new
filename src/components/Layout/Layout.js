import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

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
                <Toolbar menuClose = {this.sideDrawerCloseHandler}></Toolbar>
                <SideDrawer open={this.state.showSidedrawer} closed={this.sideDrawerCloseHandler}>

                </SideDrawer>
                <main className={classes.Layout}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

export default Layout;