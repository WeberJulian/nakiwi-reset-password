import React, { Component } from 'react';
import { Button, Form, Label, Input, Jumbotron, FormFeedback } from 'reactstrap';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";

import { Dots } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

const params = {
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
};

class AppRouter extends Component{
  constructor(props){
    super(props)
    this.state = {
      route: "ResetPassword",
      email: ""
    }
  }
  navigate(route){
    this.setState({route: route})
  }
  updateEmail(email){
    this.setState({email: email})
  }
  render(){
    switch(this.state.route){
      case("ResetPassword"):
        return <ResetPassword updateEmail={this.updateEmail.bind(this)} navigate={this.navigate.bind(this)}/>;
        break;
      case("ChangePassword"):
        return <ChangePassword email={this.state.email} navigate={this.navigate.bind(this)}/>;
        break;
      case("Validation"):
        return <h1>Everything went well</h1>;
        break;
      default:
        return <h1>Error</h1>;
        break;
    }
  }
}

export default AppRouter;

class ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      emailInvalid: false,
      emailValid: false,
      loading: false
    }
  }
  handleButtonPress(){
    this.setState({loading: true})
    this.props.updateEmail(this.state.email)
    this.sendEmail(this.state.email)
  }
  handleEmailChange(event){
    this.setState({email: event.target.value})
  }
  async sendEmail(email){
		var body = {
			email: email.toLowerCase(),
		};
		var res = await fetch('https://nakiwi-test-dev.glitch.me/sendResetToEmail', {
			...params,
			body: JSON.stringify(body)
    });
		var status = await res.json();
    this.handleResponse(status.status)
  }
  handleResponse(status){
    this.setState({loading: false})
    if(status == "OK"){
      this.setState({emailInvalid: false})
      this.setState({emailValid: true})
      this.props.navigate("ChangePassword")
    }
    else {
      this.setState({emailInvalid: true})
      this.setState({emailValid: false})
    }
  }
  render() {
    return (
      <div className="App">
        <Jumbotron className="Center-content">
          <h1 className="display-3">Reset your password</h1>
          <Form inline className="Center-content"> 
            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
            <Input valid={this.state.emailValid} invalid={this.state.emailInvalid} className="Email" type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" onChange={this.handleEmailChange.bind(this)}/>
            {this.state.loading ? <Dots/> : <Button onClick={this.handleButtonPress.bind(this)}>Reset</Button>}
            {this.state.emailInvalid ? <FormFeedback>This email is not on our servers !</FormFeedback> : <div/>}
          </Form>
        </Jumbotron>
      </div>
    );
  }
}

class ChangePassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      code: undefined,
      codeInvalid: false,
      loading: false
    }
  }
  componentDidMount(){
    if(this.props.email != undefined){
      this.setState({email: this.props.email})
    }
    else{
      this.props.navigate("ResetPassword")
    }
  }
  handleButtonPress(){
    this.setState({loading: true})
    this.sendPassword()
  }
  handleEmailChange(event){
    this.setState({email: event.target.value})
  }
  handlePasswordChange(event){
    this.setState({password: event.target.value})
  }
  handleCodeChange(event){
    this.setState({code: event.target.value})
    this.setState({codeInvalid: false})
  }
  async sendPassword(){
		var body = {
      email: this.state.email.toLowerCase(),
      code: this.state.code,
      password: this.state.password
		};
		var res = await fetch('https://nakiwi-test-dev.glitch.me/changePassword', {
			...params,
			body: JSON.stringify(body)
    });
		var status = await res.json();
    this.handleResponse(status.status)
  }
  handleResponse(status){
    this.setState({loading: false})
    if(status == "OK"){
      this.props.navigate("Validation")
    }
    else {
      this.setState({codeInvalid: true})
    }
  }
  render() {
    return (
      <div className="App">
        <Jumbotron className="Center-content">
          <h1 className="display-3">Change your password</h1>
          <h3>{this.state.email}</h3>
          <Form inline className="Center-content"> 
            <Label for="exampleEmail" className="mr-sm-2">Code</Label>
            <Input valid={this.state.emailValid} invalid={this.state.codeInvalid} className="Email" type="number" name="email" id="exampleEmail" placeholder="123456" onChange={this.handleCodeChange.bind(this)}/>
            {this.state.codeInvalid ? <FormFeedback>This code is not valid</FormFeedback> : <div/>}
          </Form>
          <Form inline className="Center-content"> 
            <Label for="exampleEmail" className="mr-sm-2">New password</Label>
            <Input className="Password" type="password" name="password" id="examplePassword" placeholder="password" onChange={this.handlePasswordChange.bind(this)}/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Form>
          {this.state.loading ? <Dots className="Email"/> : <Button className="Email" onClick={this.handleButtonPress.bind(this)}>Change Password</Button>}
        </Jumbotron>
      </div>
    );
  }
}