import React from 'react';
import { Tab } from 'semantic-ui-react';
import './App.css';
import Event from "../Event/Event";
import Teacher from "../Teacher/Teacher";

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

    componentDidMount(){
        if(sessionStorage.getItem("activeIndex") === null){
            sessionStorage.setItem("activeIndex", '0')
        }
        console.log("active", sessionStorage.getItem("activeIndex"));
    }

    render(){
        return (
            <div className={"col-lg-12 mt-4 mx-auto"}>
                <Tab panes={panes}
                     menu={{ fluid: true, vertical: true }}
                     menuPosition='right'
                     defaultActiveIndex={sessionStorage.getItem("activeIndex")}/>
            </div>
        )
    }
}
export default App;
