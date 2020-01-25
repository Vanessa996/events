import React, {Component} from 'react'
import {Button, Table, Input, Form, Dropdown} from 'semantic-ui-react'
import axios from 'axios';
import {Modal} from "react-bootstrap";

class Teacher extends Component {

    state = {
        index: 0,
        teachers: [],
        events: [],
        name: "",
        addModalFlag: false,
        currentTeacher: "",
        allEvents: [],
        teacherNewEvent: "",
        activeEvents: 0,
        hasTeachersFlag: false,
        eventsEmpty: true
    };

    componentDidMount() {
        sessionStorage.setItem("activeIndex", this.state.index);
        axios.get(`http://localhost:8080/teacher`)
            .then(t => {
                console.log("data", t.data);
                if(t.data.length !== 0) {
                    const teachers = t.data;
                    const id = teachers[0].teacher_id;
                    const currentTeacher = teachers[0].fullName;
                    console.log("curr", currentTeacher)
                    this.getEvents(id)
                    this.setState({
                        teachers,
                        activeEvents: id,
                        currentTeacher,
                        hasTeachersFlag: true
                    });
                }
            });
        axios.get("http://localhost:8080/events").then(r => {
            this.setState({allEvents: r.data})
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

    changeActiveTeacher = (activeEvents, currentTeacher) => {
        this.setState({activeEvents, currentTeacher})
        this.getEvents(activeEvents)
    };

    updateTeacherName = (e) => {
        this.setState({name: e.target.value})
    };

    createNewTeacher = () =>{
        console.log("teacher", this.state.name);
        if(this.state.name !== "") {
            axios.get(`http://localhost:8080/teacher`)
                .then(t => {
                    const teachers = t.data;
                    let flag = false;
                    for (let x = 0; x < teachers.length; x++) {
                        if (teachers[x].fullName === this.state.name) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        axios.post('http://localhost:8080/teacher/create?name=' + this.state.name).then(r => window.location.reload());
                    } else {

                    }
                });
        }
    };

    updateNewEvent = (e, {value }) => {
        console.log("type", value)
        this.setState({teacherNewEvent: value})
    };

    handleAddOpen = () => this.setState({ addModalFlag: true });

    handleAddClose = () => this.setState({ addModalFlag: false });

    addAnEventToTeacher = (e) => {
        console.log("potato", e)
        axios.post('http://localhost:8080/teacher/'+this.state.activeEvents+'/events/add/'+e)
            .then(this.handleAddClose)
            .then(r => window.location.reload());
    };

    removeAnEventToTeacher = (e) => {
        console.log("potato", e)
        axios.delete('http://localhost:8080/teacher/'+this.state.activeEvents+'/events/remove/'+e)
            .then(r => window.location.reload());
    };


    render(){
        console.log(this.state.activeEvents)
        return <div className={"col-lg-12 "}>


            <div className={"text-center mb-4"}>
                <Input className={"mr-1"} onChange={this.updateTeacherName}/>
                <Button basic color='green'
                        content='Insert'
                        onClick={this.createNewTeacher}
                />
            </div>

            {this.state.hasTeachersFlag &&
                <div className={"col-lg-12 "}>
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
                                        if (t.teacher_id === this.state.activeEvents)
                                            return (
                                                <Table.Row key={t.teacher_id}
                                                           className={"table-success"}
                                                           onClick={() => this.changeActiveTeacher(t.teacher_id, t.fullName)}>
                                                    <Table.Cell>{t.fullName}</Table.Cell>
                                                </Table.Row>
                                            )
                                        else
                                            return (
                                                <Table.Row key={t.teacher_id}
                                                           onClick={() => this.changeActiveTeacher(t.teacher_id, t.fullName)}>
                                                    <Table.Cell>{t.fullName}</Table.Cell>
                                                </Table.Row>
                                            )
                                    })
                                }
                            </Table.Body>
                        </Table>
                    </div>
                    <div className={"col-lg-8 float-right"}>

                        <div className={"text-center mb-4 col-lg-12"}>
                            <Button basic color='green'
                                    content='Add new event'
                                    onClick={this.handleAddOpen}
                            />

                            <Modal show={this.state.addModalFlag}
                                   onHide={this.handleAddClose} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add an event to the teacher</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className = {"m-3 col-lg-12 mx-auto"}>

                                    <Table color={"green mx-auto text-center"} selectable>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Name</Table.HeaderCell>
                                                <Table.HeaderCell>From</Table.HeaderCell>
                                                <Table.HeaderCell>To</Table.HeaderCell>
                                                <Table.HeaderCell>Location</Table.HeaderCell>
                                                <Table.HeaderCell>Type</Table.HeaderCell>
                                                <Table.HeaderCell />
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {
                                                this.state.allEvents.map((e) => (

                                                    <Table.Row key={e.event_id}>
                                                        <Table.Cell>{e.eventName}</Table.Cell>
                                                        <Table.Cell>{e.eventDateFrom}</Table.Cell>
                                                        <Table.Cell>{e.eventDateTo}</Table.Cell>
                                                        <Table.Cell>{e.location}</Table.Cell>
                                                        <Table.Cell>{e.eventType}</Table.Cell>
                                                        <Table.Cell>
                                                            <Button icon={"plus"}
                                                                    compact
                                                                    basic
                                                                    color='green'
                                                                    onClick={() => this.addAnEventToTeacher(e.event_id)}/>

                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))
                                            }

                                        </Table.Body>
                                    </Table>

                                </Modal.Body>
                                <Modal.Footer className={"mx-auto"}>
                                    <Button variant="secondary" color={"green"} basic compact onClick={this.handleAddClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                        {!this.state.eventsEmpty &&
                        <Table color={"green"}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>From</Table.HeaderCell>
                                    <Table.HeaderCell>To</Table.HeaderCell>
                                    <Table.HeaderCell>Location</Table.HeaderCell>
                                    <Table.HeaderCell>Type</Table.HeaderCell>
                                    <Table.HeaderCell/>
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
                                            <Table.Cell>
                                                <Button icon={"delete"}
                                                        compact
                                                        basic
                                                        color='green'
                                                        onClick={() => this.removeAnEventToTeacher(e.event_id)}/>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table>
                        }

                        {
                            this.state.eventsEmpty &&
                            <h2 className={"m-3"}>{this.state.currentTeacher} has no upcoming events.</h2>
                        }
                    </div>
                </div>
            }

            {!this.state.hasTeachersFlag &&
            <h2 className={"mx-auto m-3 text-center"}>There are no teachers.</h2>
            }
        </div>
    }
}
export default Teacher;
