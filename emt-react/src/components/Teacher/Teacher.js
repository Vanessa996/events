import React, {Component} from 'react'
import { Table} from 'semantic-ui-react'
import axios from 'axios';

class Teacher extends Component {

    state = {
        teachers: [],
        events: [],
        activeEvents: 0
    };

    componentDidMount() {
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
                this.setState({events});
            });
    }


    render(){

        return<div className={"col-lg-12 "}>
            <div className={"col-lg-3 float-left"}>
                <Table color={"green"} selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Teachers</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.teachers.map((t) => (
                                <Table.Row key={t.teacher_id}>
                                    <Table.Cell>{t.fullName}</Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
            </div>
            <div className={"col-lg-8 float-right"}>
                <Table color={"green"} selectable>
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
            </div>
        </div>
    }
}
export default Teacher;
