import React, {Component} from 'react'
import {Button, Icon, Table, Form, Dropdown} from 'semantic-ui-react'
import {Modal} from 'react-bootstrap'
import axios from 'axios';
import CancelEvent from "./CancelEvent/CancelEvent";


const eventTypeOptions = [
    { key: 0, value: 'Conference', flag: 'Con', text: 'Conference' },
    { key: 1, value: 'Event', flag: 'Ev', text: 'Event' },
    { key: 2, value: 'Jury', flag: 'Ju', text: 'Jury' },
]

class Event extends Component {

    state = {
        index: 1,
        events: [],
        insertModalFlag: false,
        cancelModalFlag: false,
    };

    componentDidMount() {
        sessionStorage.setItem("activeIndex", this.state.index);
        console.log(sessionStorage.getItem("activeIndex"))
       /* axios.get(`http://localhost:8080/events`)
            .then(e => {
                const events = e.data;
                this.setState({
                    events
                });
            });*/
    }

    handleInsertOpen = () => this.setState({ insertModalFlag: true });

    handleInsertClose = () => this.setState({ insertModalFlag: false });

    insertEvent = (e) => {
        /*axios.post(`http://localhost:8080/events/add`, {
            eventName: e.name,
            eventDateFrom: e.dateFrom,
            eventDateTo: e.dateto,
            location: e.location,
            eventType: e.type
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
                console.log(error);
        });*/
    };

    handleCancelOpen = () => this.setState({ cancelModalFlag: true });

    handleCancelClose = () => this.setState({ cancelModalFlag: false });

    cancelEvent = (e) => {
        /*axios.delete(`http://localhost:8080/events/delete/`+e)
            .then(() => {this.handleClose()}
        )*/
    };



    render(){

        console.log(this.state.cancelModalFlag);

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
                                <input name='name' type={"text"}/>
                            </Form.Field>
                            <Dropdown
                                placeholder='Select type'
                                fluid
                                search
                                selection
                                name={"type"}
                                options={eventTypeOptions}
                            />
                            <Form.Field>
                                <label>Start Date</label>
                                <input name='dateFrom' type="datetime-local"/>
                            </Form.Field>
                            <Form.Field>
                                <label>End Date</label>
                                <input name='dateTo' type="datetime-local"/>
                            </Form.Field>
                            <Form.Field>
                                <label>Location</label>
                                <input name='location' />
                            </Form.Field>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className={"mx-auto"}>
                        <Button variant="secondary" color={"red"} basic compact onClick={this.handleInsertClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" color={"green"} basic compact onClick={() => this.insertEvent}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

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
                   {/*{
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
                                            <Button variant="primary" onClick={() => this.cancelEvent(e.event_id)}>
                                                Yes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }*/}
                    <Table.Row>
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
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    }
}
export default Event;
