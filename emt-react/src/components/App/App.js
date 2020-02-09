import React from 'react';
import './App.css';
import Login from "../Login/Login";
import {Redirect, Route} from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";
import Schedule from "../Schedule/Schedule";

class App extends React.Component{

    render(){
        return (
            <div>
                <Route exact path="/" render={() => (<Redirect to="/schedule" />)} />
                <Route exact path='/schedule' component={Schedule} />
                <Route exact path='/schedule/login' component={Login} />
                <Route exact path='/schedule/dashboard' component={Dashboard} />
            </div>
        )
    }
}
export default App;
