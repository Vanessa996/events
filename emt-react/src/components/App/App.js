import React from 'react';
import { Tab } from 'semantic-ui-react';
import './App.css';
import Event from "../Dashboard/Event/Event";
import Teacher from "../Dashboard/Teacher/Teacher";
import Login from "../Login/Login";
import {Redirect, Route} from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";
import Schedule from "../Schedule/Schedule";

const panes = [
    {
        menuItem: 'Teachers',
        render: () => <Tab.Pane><Teacher teachers={"Teachers"} /></Tab.Pane>,
    },
    {
        menuItem: 'Events',
        render: () => <Tab.Pane><Event events={"Events"}/></Tab.Pane>
    }
];

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
