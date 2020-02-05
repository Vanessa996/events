import React, {Component} from 'react';
import {Button, Form, Input} from "semantic-ui-react";


class Login extends Component {

    state = {
        username: "",
        password: "",
        hasEmptyField: false,
    };

    setUsername = (e) => {
        this.setState({username: e.target.value})
    };

    setPassword = (e) => {
        this.setState({password: e.target.value})
    };

    submitLoginInfo = () => {
        if(this.state.username === "" || this.state.password === ""){
            this.setState({hasEmptyField: true})
        }
        else{
            window.location.replace("/schedule/dashboard");
        }
    };

    backToSchedule = () => {
        window.location.replace("/schedule");
    };

    render() {
        return(
            <Form className={"mt-5 col-lg-12"}>
                {
                    this.state.hasEmptyField &&
                    <Form.Field className = {"col-lg-2 mx-auto"}>
                        <h5 className={"text-danger"}>Invalid username or password!</h5>
                    </Form.Field>
                }
                <Form.Field className = {"col-lg-2 mx-auto"}>
                    <label>Username:</label>
                    <Input onChange={this.setUsername}/>
                </Form.Field>
                <Form.Field className = {"col-lg-2 mx-auto"}>
                    <label>Password:</label>
                    <Input type="password"
                           onChange={this.setPassword}/>
                </Form.Field>
                <Form.Field className = {"text-center"}>
                    <Button onClick={this.backToSchedule}
                            circular basic color='red'
                            content='Go Back'/>
                    <Button onClick={this.submitLoginInfo}
                            circular color='green'
                            content='Login'/>
                </Form.Field>
            </Form>
        );
    }

}
export default Login;