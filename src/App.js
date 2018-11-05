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

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/Reset-Password/" component={ResetPassword} />
      <Route path="/Change-Password/" component={ChangePassword} />
    </div>
  </Router>
);

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
      this.props.history.push({pathname: '/Change-Password/', state: {email: this.state.email}})
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
      emailInvalid: false,
      emailValid: false,
      loading: false
    }
  }
  componentDidMount(){
    if(this.props.location.state != undefined){
      this.setState({email: this.props.location.state.email})
    }
    else{
      this.props.history.push({pathname: '/Reset-Password/'})
    }
  }
  handleButtonPress(){
    this.setState({loading: true})
    this.sendPassword(this.state.email)
  }
  handleEmailChange(event){
    this.setState({email: event.target.value})
  }
  handlePasswordChange(event){
    this.setState({password: event.target.value})
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
      window.location = "https://nakiwi.co.uk/"
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
          <h1 className="display-3">Change your password</h1>
          <h3>{this.state.email}</h3>
          <Form inline className="Center-content"> 
            <Label for="exampleEmail" className="mr-sm-2">Code</Label>
            <Input valid={this.state.emailValid} invalid={this.state.emailInvalid} className="Email" type="email" name="email" id="exampleEmail" placeholder="123456" onChange={this.handleEmailChange.bind(this)}/>
            
            {this.state.emailInvalid ? <FormFeedback>This email is not on our servers !</FormFeedback> : <div/>}
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
