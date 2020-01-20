import React, {Component} from 'react'
import {Button, Table} from 'semantic-ui-react'
import axios from 'axios';

class Teacher extends Component {

    state = {
        index: 0,
        teachers: [],
        events: [],
        activeEvents: 0,
        eventsEmpty: true
    };

    componentDidMount() {
        sessionStorage.setItem("activeIndex", this.state.index);
        axios.get(`http://localhost:8080/teacher`)
            .then(t => {
                const teachers = t.data;
                const id = teachers[0].teacher_id
                this.getEvents(id)
                this.setState({
                    teachers: teachers,
                    activeEvents: id
                });
            });
    }

    getEvents = (id) => {
        axios.get("http://localhost:8080/teacher/"+id+"/events")
            .then(e => {
                const events = e.data;
                this.isEmpty(events);
                this.setState({events: events});
            });
    };

    isEmpty = (e) => {
        console.log(e)
        if(e.length === 0){
            this.setState({eventsEmpty: true})
        }
        else{
            this.setState({eventsEmpty: false})
        }
    };

    changeActiveTeacher = (activeEvents) => {
        this.setState({activeEvents})
        this.getEvents(activeEvents)
    };


    render(){
        console.log(this.state.activeEvents)
        return<div className={"col-lg-12 "}>
            <div className={"text-center mb-4"}><Button basic color='green' content='Insert a Teacher'/></div>
            <div className={"col-lg-3 float-left"}>
                <Table color={"green"} selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Teachers</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.teachers.map((t) => {
                                if(t.teacher_id === this.state.activeEvents)
                                return(
                                    <Table.Row key={t.teacher_id}
                                               className={"table-success"}
                                                onClick={() => this.changeActiveTeacher(t.teacher_id)}>
                                        <Table.Cell>{t.fullName}</Table.Cell>
                                    </Table.Row>
                                )
                                else
                                    return(
                                        <Table.Row key={t.teacher_id}
                                                   onClick={() => this.changeActiveTeacher(t.teacher_id)}>
                                            <Table.Cell>{t.fullName}</Table.Cell>
                                        </Table.Row>
                                    )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
            <div className={"col-lg-8 float-right"}>
                {!this.state.eventsEmpty &&
                <Table color={"green"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>From</Table.HeaderCell>
                            <Table.HeaderCell>To</Table.HeaderCell>
                            <Table.HeaderCell>Location</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.events.map((e) => (
                                <Table.Row key={e.event_id}>
                                    <Table.Cell>{e.eventName}</Table.Cell>
                                    <Table.Cell>{e.eventDateFrom}</Table.Cell>
                                    <Table.Cell>{e.eventDateTo}</Table.Cell>
                                    <Table.Cell>{e.location}</Table.Cell>
                                    <Table.Cell>{e.eventType}</Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
                }
                {this.state.eventsEmpty &&
                <h2>There are no upcoming events.</h2>
                }
            </div>
        </div>
    }
}
export default Teacher;
