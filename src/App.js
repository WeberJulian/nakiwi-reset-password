import React, { Component } from 'react';
import { Button, Form, Label, Input, Jumbotron, FormFeedback } from 'reactstrap';
import { render } from 'react-dom';
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

class App extends Component {
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

export default App;
