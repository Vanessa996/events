import React, {Component} from 'react';
import Teacher from "../Dashboard/Teacher/Teacher";

class Schedule extends Component{

    componentDidMount() {
        if(sessionStorage.getItem("user") !== "default")
            window.location.replace("/schedule/dashboard");
    }

    render() {
        return <Teacher schedule = {"default"}/>;
    }

}
export default Schedule;