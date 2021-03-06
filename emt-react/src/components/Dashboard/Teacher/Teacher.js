import React, {Component} from 'react'
import {Button, Table, Input} from 'semantic-ui-react'
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
        eventsEmpty: true,
        defaultTeacher: this.props.schedule
    };

    componentDidMount() {
        sessionStorage.setItem("activeIndex", this.state.index);

        if(this.state.defaultTeacher === "admin" || this.state.defaultTeacher === "default"){
            axios.get(`http://localhost:8080/teacher`)
                .then(t => {
                    console.log("data", t.data);
                    if (t.data.length !== 0) {
                        const teachers = t.data;
                        let id;
                        let currentTeacher;

                        id = teachers[0].teacher_id;
                        currentTeacher = teachers[0].fullName;
                        sessionStorage.setItem("activeEvents", id);
                        sessionStorage.setItem("currentTeacher", currentTeacher);

                        console.log("curr", currentTeacher);
                        this.getEvents(id);
                        this.setState({
                            teachers,
                            activeEvents: id,
                            currentTeacher,
                            hasTeachersFlag: true
                        });
                    }
                });
        }
        else{
            axios.get("http://localhost:8080/teacherByName?name=" + sessionStorage.getItem("user")).then(r => {
                console.log("lame", r.data);
                let id = r.data.teacher_id;
                let currentTeacher = r.data.fullName;
                sessionStorage.setItem("activeEvents", id);
                sessionStorage.setItem("currentTeacher", currentTeacher);
                this.getEvents(id);
                this.setState({
                    teachers: r.data,
                    activeEvents: id,
                    currentTeacher,
                    hasTeachersFlag: true
                });
            })
        }
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
        this.setState({activeEvents, currentTeacher});
        this.getEvents(activeEvents);
        sessionStorage.setItem("activeEvents", activeEvents);
        sessionStorage.setItem("currentTeacher", currentTeacher);
        console.log("new aE", sessionStorage.getItem("activeEvents"));
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

    loginPage = () => {
        if(sessionStorage.getItem("user") !== "default")
            window.location.replace("/schedule/dashboard");
        else
            window.location.replace("/schedule/login");
    };

    removeATeacher = (t) => {
        axios.delete('http://localhost:8080/teacher/delete/'+t)
            .then(r => window.location.reload());
    };


    render(){
      //  if(sessionStorage["activeEvents"] && sessionStorage["currentTeacher"])
            return (<div className={"col-lg-12 "}>

                {
                    this.state.defaultTeacher === "admin" &&
                    <div className={"text-center mb-4"}>
                        <Input className={"mr-1"} onChange={this.updateTeacherName}/>
                        <Button  circular basic color='green'
                                content='Insert'
                                onClick={this.createNewTeacher}
                        />
                    </div>
                }

                {
                    this.state.defaultTeacher === "default" &&
                    <div className={"text-center"}>
                        <Button circular color='green'
                                content='Login'
                                onClick={this.loginPage}
                                className={"m-3"}
                        />
                    </div>
                }

                {this.state.hasTeachersFlag && (this.state.defaultTeacher === "admin" || this.state.defaultTeacher === "default") &&
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
                                            if (t.teacher_id === JSON.parse(sessionStorage.getItem("activeEvents")))
                                                return (
                                                    <Table.Row key={t.teacher_id}
                                                               className={"table-success"}
                                                               onClick={() => this.changeActiveTeacher(t.teacher_id, t.fullName)}>
                                                        <Table.Cell>{t.fullName}</Table.Cell>
                                                        {
                                                            this.state.defaultTeacher === "admin" &&
                                                            <Table.Cell>
                                                                <Button icon={"delete"}
                                                                        compact
                                                                        basic
                                                                        circular
                                                                        color='red'
                                                                        onClick={() => this.removeATeacher(t.teacher_id)}/>
                                                            </Table.Cell>
                                                        }
                                                    </Table.Row>
                                                );
                                            else
                                                return (
                                                    <Table.Row key={t.teacher_id}
                                                               onClick={() => this.changeActiveTeacher(t.teacher_id, t.fullName)}>
                                                        <Table.Cell>{t.fullName}</Table.Cell>
                                                        {
                                                            this.state.defaultTeacher === "admin" &&
                                                            <Table.Cell>
                                                                <Button icon={"delete"}
                                                                        compact
                                                                        basic
                                                                        circular
                                                                        color='red'
                                                                        onClick={() => this.removeATeacher(t.teacher_id)}/>
                                                            </Table.Cell>
                                                        }
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
                                    {!this.state.defaultTeacher && <Table.HeaderCell/>}
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    this.state.events.map((e) => (
                                        <Table.Row key={e.event_id}>
                                            <Table.Cell>{e.eventName}</Table.Cell>
                                            <Table.Cell>
                                                {
                                                    new Date(Date.UTC(
                                                        e.eventDateFrom[0],
                                                        e.eventDateFrom[1]-1,
                                                        e.eventDateFrom[2],
                                                        e.eventDateFrom[3],
                                                        e.eventDateFrom[4])).toUTCString()
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                {
                                                    new Date(Date.UTC(
                                                        e.eventDateTo[0],
                                                        e.eventDateTo[1]-1,
                                                        e.eventDateTo[2],
                                                        e.eventDateTo[3],
                                                        e.eventDateTo[4])).toUTCString()
                                                }
                                            </Table.Cell>
                                            <Table.Cell>{e.location}</Table.Cell>
                                            <Table.Cell>{e.eventType}</Table.Cell>
                                            {!this.state.defaultTeacher &&
                                            <Table.Cell>
                                                <Button icon={"delete"}
                                                        compact
                                                        basic
                                                        circular
                                                        color='green'
                                                        onClick={() => this.removeAnEventToTeacher(e.event_id)}/>
                                            </Table.Cell>
                                            }
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

                {this.state.defaultTeacher !== "admin" && this.state.defaultTeacher !== "default" &&
                <div className={"col-lg-12 "}>

                    <div className={"col-lg-8 mx-auto"}>

                        <h1 className={"text-center m-5"}> Welcome {this.state.teachers.fullName}</h1>
                        <div className={"text-center mb-4 col-lg-12"}>
                            <Button circular basic color='green'
                                    content='Add new event'
                                    onClick={this.handleAddOpen}
                            />

                            <Modal show={this.state.addModalFlag}
                                   className={"col-lg-12"}
                                   onHide={this.handleAddClose} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add an event to the teacher</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className={"m-3 col-lg-12 mx-auto"}>

                                    {this.state.allEvents.length === this.state.events.length ?
                                        <h2 className={"m-3"}>There are no other available events.</h2>
                                        :
                                        <Table color={"green"} className={"mx-auto text-center"} selectable>
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
                                                    this.state.allEvents.map((e) => {

                                                        if (!this.state.events.some((element) => element.event_id === e.event_id))
                                                            return (
                                                                <Table.Row key={e.event_id}>
                                                                    <Table.Cell>{e.eventName}</Table.Cell>
                                                                    <Table.Cell>
                                                                        {
                                                                            new Date(Date.UTC(
                                                                                e.eventDateFrom[0],
                                                                                e.eventDateFrom[1]-1,
                                                                                e.eventDateFrom[2],
                                                                                e.eventDateFrom[3],
                                                                                e.eventDateFrom[4])).toUTCString()
                                                                        }
                                                                    </Table.Cell>
                                                                    <Table.Cell>
                                                                        {
                                                                            new Date(Date.UTC(
                                                                                e.eventDateTo[0],
                                                                                e.eventDateTo[1]-1,
                                                                                e.eventDateTo[2],
                                                                                e.eventDateTo[3],
                                                                                e.eventDateTo[4])).toUTCString()
                                                                        }
                                                                    </Table.Cell>
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
                                                            )
                                                    })
                                                }

                                            </Table.Body>
                                        </Table>
                                    }
                                </Modal.Body>
                                <Modal.Footer className={"mx-auto"}>
                                    <Button variant="secondary"
                                            color={"green"} basic compact
                                            circular
                                            onClick={this.handleAddClose}>
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
                                            <Table.Cell>
                                                {
                                                    new Date(Date.UTC(
                                                        e.eventDateFrom[0],
                                                        e.eventDateFrom[1]-1,
                                                        e.eventDateFrom[2],
                                                        e.eventDateFrom[3],
                                                        e.eventDateFrom[4])).toUTCString()
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                {
                                                    new Date(Date.UTC(
                                                        e.eventDateTo[0],
                                                        e.eventDateTo[1]-1,
                                                        e.eventDateTo[2],
                                                        e.eventDateTo[3],
                                                        e.eventDateTo[4])).toUTCString()
                                                }
                                            </Table.Cell>
                                            <Table.Cell>{e.location}</Table.Cell>
                                            <Table.Cell>{e.eventType}</Table.Cell>

                                            <Table.Cell>
                                                <Button icon={"delete"}
                                                        compact
                                                        basic
                                                        circular
                                                        color='red'
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
                            <h2 className={"m-3 text-center"}>{this.state.currentTeacher} has no upcoming events.</h2>
                        }
                    </div>
                </div>
                }
            </div>);

    }
}
export default Teacher;

/*
* else
            return(
            <Segment>
                <Dimmer active inverted>
                    <Loader size='large'/>
                </Dimmer>
            </Segment>
            )*/