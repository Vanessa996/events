import React, {Component} from 'react'
import {Button, Table} from 'semantic-ui-react'
import axios from 'axios';

class Event extends Component {

    state = {
        events: []
    };

    componentDidMount() {
        axios.get(`http://localhost:8080/events`)
            .then(e => {
                const events = e.data;
                this.setState({
                    events
                });
            });
    }

    render(){

        return<div className={"col-lg-12 "}>
            <div className={"text-center"}><Button basic color='green' content='Create an Event'/></div>
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
    }
}
export default Event;
