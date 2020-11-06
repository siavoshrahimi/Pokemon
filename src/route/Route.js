import React,{Component} from 'react';
//routing
import {Switch,Route,BrowserRouter,Redirect} from 'react-router-dom';
//components
import Home from '../pages/Home/Home';
import Detail from '../pages/Detail/Detail';

class Routes extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/pokemon' component={Home}/>
                    <Route exact path='/'>
                        <Redirect to='/pokemon'/>
                    </Route>
                    <Route exact path='/detail/:name' component={Detail}/>
                    <Route path='*'>
                        <Redirect to='/pokemon'/>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes;