import React, {Component} from 'react'
import {Button, Icon, Table, Form, Dropdown} from 'semantic-ui-react'
import {Modal} from 'react-bootstrap'
import axios from 'axios';

const eventTypeOptions = [
    { key: 0, value: 'Conference', text: 'Conference' },
    { key: 1, value: 'Event', text: 'Event' },
    { key: 2, value: 'Jury', text: 'Jury' },
];

class Event extends Component {

    state = {
        index: 1,
        events: [],
        hasEventsFlag: false,
        name: "",
        dateFrom: null,
        dateTo: null,
        location: "",
        type: "",
        deleteEventID: 0,
        insertModalFlag: false,
        cancelModalFlag: false,

    };

    componentDidMount() {
        sessionStorage.setItem("activeIndex", this.state.index);
        console.log(sessionStorage.getItem("activeIndex"))
        axios.get(`http://localhost:8080/events`)
            .then(e => {
                const events = e.data;
                if(events.length !== 0)
                    this.setState({
                        events,
                        hasEventsFlag: true
                    });
            });
    }

    updateName = (e) => {
        console.log("name", e.target.value)
        this.setState({name: e.target.value})
    };

    updateDateFrom = (e) => {
        console.log("dateFrom", e.target.value)
        this.setState({dateFrom: e.target.value})
    };

    updateDateTo = (e) => {
        console.log("dateTo", e.target.value)
        this.setState({dateTo: e.target.value})
    };

    updateLocation = (e) => {
        //console.log("location", location)
        this.setState({location: e.target.value})
    };

    updateType = (e, {value }) => {
        console.log("type", value)
        this.setState({type: value})
    };

    handleInsertOpen = () => this.setState({ insertModalFlag: true });

    handleInsertClose = () => this.setState({ insertModalFlag: false });

    insertEvent = () => {
        console.log("potato")
        axios.post('http://localhost:8080/events/add', {
            eventName: this.state.name,
            eventDateFrom: this.state.dateFrom,
            eventDateTo: this.state.dateTo,
            location: this.state.location,
            eventType: this.state.type
        }).then(this.handleInsertClose)
            .then(r => window.location.reload());

    };

    handleCancelOpen = (e) => this.setState({ cancelModalFlag: true, deleteEventID: e });

    handleCancelClose = () => this.setState({ cancelModalFlag: false });

    cancelEvent = (e) => {
        console.log("delete", e)
        axios.delete('http://localhost:8080/events/delete/'+e)
            .then(this.handleCancelClose)
        axios.delete('http://localhost:8080/events/delete/'+e)
            .then(this.handleCancelClose).then(r => window.location.reload())

    };

    render(){

        return<div className={"col-lg-12 "}>

            <div className={"text-center"}>
                <Button basic
                        color='green'
                        content='Create an Event'
                        onClick={this.handleInsertOpen}/>

                <Modal show={this.state.insertModalFlag}
                       onHide={this.handleInsertClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className = {"m-3 col-lg-10 mx-auto"}>
                        <Form>
                            <Form.Field>
                                <label>Name of event</label>
                                <input name='name'
                                       type={"text"}
                                       onChange={(e) => this.updateName(e)}/>
                            </Form.Field>
                            <Form.Field>
                                <Dropdown
                                    placeholder='Select type'
                                    fluid
                                    search
                                    selection
                                    name={"type"}
                                    options={eventTypeOptions}
                                    onChange={this.updateType}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Start Date</label>
                                <input name='dateFrom'
                                       type="datetime-local"
                                       onChange={(e) => this.updateDateFrom(e)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>End Date</label>
                                <input name='dateTo'
                                       type="datetime-local"
                                       onChange={(e) => this.updateDateTo(e)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Location</label>
                                <input name='location'
                                       type={"text"}
                                       onChange={(e) => this.updateLocation(e)}/>
                            </Form.Field>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className={"mx-auto"}>
                        <Button variant="secondary" color={"red"} basic compact onClick={this.handleInsertClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" color={"green"} basic compact onClick={this.insertEvent}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <Modal show={this.state.cancelModalFlag}
                   onHide={this.handleCancelClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to cancel the event?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCancelClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => this.cancelEvent(this.state.deleteEventID)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            { this.state.hasEventsFlag &&
            <Table color={"green"} selectable>
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
                        this.state.events.map((e) => (

                            <Table.Row key={e.event_id}>
                                <Table.Cell>{e.eventName}</Table.Cell>
                                <Table.Cell>{e.eventDateFrom}</Table.Cell>
                                <Table.Cell>{e.eventDateTo}</Table.Cell>
                                <Table.Cell>{e.location}</Table.Cell>
                                <Table.Cell>{e.eventType}</Table.Cell>
                                <Table.Cell>
                                    <Button icon={"cancel"}
                                            compact
                                            basic
                                            color='green'
                                            onClick={() => this.handleCancelOpen(e.event_id)}/>

                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                   {/* <Table.Row>
                        <Table.Cell>Potato</Table.Cell>
                        <Table.Cell>Potato</Table.Cell>
                        <Table.Cell>Potato</Table.Cell>
                        <Table.Cell>Potato</Table.Cell>
                        <Table.Cell>Potato</Table.Cell>
                        <Table.Cell>
                            <Button icon={"cancel"}
                                    compact
                                    basic
                                    color='red'
                                    onClick={this.handleCancelOpen}/>

                            <Modal show={this.state.cancelModalFlag}
                                   onHide={this.handleCancelClose} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Cancel Event</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to cancel the event?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleCancelClose}>
                                        No
                                    </Button>
                                    <Button variant="primary" onClick={() => this.cancelEvent}>
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Table.Cell>
                    </Table.Row>*/}
                </Table.Body>
            </Table>
            }
            {
                !this.state.hasEventsFlag &&
                <h2 className={"mx-auto m-3 text-center"}>There are no upcoming events.</h2>
            }
        </div>
    }
}
export default Event;
