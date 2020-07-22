import React, {Component} from 'react';
import {Button, Tab} from "semantic-ui-react";
import Teacher from "./Teacher/Teacher";
import Event from "./Event/Event";

const panes = [
    {
        menuItem: 'Teachers',
        render: () => <Tab.Pane><Teacher schedule={"admin"} /></Tab.Pane>,
    },
    {
        menuItem: 'Events',
        render: () => <Tab.Pane><Event events={"admin"}/></Tab.Pane>
    }
];

class Dashboard extends Component {

    state = {
        userType: sessionStorage.getItem("user")
    };

    componentDidMount(){

        if(sessionStorage.getItem("user") === "default")
            window.location.replace("/schedule");

        if(sessionStorage.getItem("activeIndex") === null){
            sessionStorage.setItem("activeIndex", '0')
        }
        console.log("active", sessionStorage.getItem("activeIndex"));
    }

    logoutPage = () => {
        sessionStorage.setItem("user", "default");
        window.location.replace("/schedule");
    };

    render() {

        if(this.state.userType === "admin")
        return(
            <div className={"col-lg-12 row mt-4 mx-auto"}>

                <div className={"col-lg-12"}>
                    <Button color='yellow'
                            circular
                            content='Logout'
                            onClick={this.logoutPage}
                            className={"m-3 float-left"}
                    />
                </div>

                <Tab className = "col-lg-12"
                     panes={panes}
                     menu={{ fluid: true, vertical: true }}
                     menuPosition='right'
                     defaultActiveIndex={sessionStorage.getItem("activeIndex")}/>
            </div>
        );
        else
            return(
                <div className={"col-lg-12 row mt-4 mx-auto"}>

                    <div className={"col-lg-12"}>
                        <Button color='yellow'
                                circular
                                content='Logout'
                                onClick={this.logoutPage}
                                className={"m-3 float-left"}
                        />
                    </div>

                    <Teacher schedule = {sessionStorage.getItem("user")}/>
                </div>
            );
    }

}
export default Dashboard;