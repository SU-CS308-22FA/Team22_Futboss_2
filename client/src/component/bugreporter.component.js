import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function BugReporter() {


  const reportbug = (e) => {
    e.preventDefault();
    console.log(`${process.env.REACT_APP_API_URL}/bugreport`)
    Axios.post(`${process.env.REACT_APP_API_URL}/bugreport`, {
      name: state.name,
      email: state.email,
      subject: state.email,
      message: state.message,
    }).then((response) => {console.log(
      response)}).catch((error)=>console.log(error));
  };

  const [state, setState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const sendEmail = event => {
    event.preventDefault();

    console.log('We will fill this up shortly.');
    // code to trigger Sending email
  };

  const onInputChange = event => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    });
  };


  window.scrollTo(0, 0);

  return (
    <div>
      <form onSubmit={reportbug}>
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            placeholder="Enter your full name"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={state.email}
            placeholder="Enter your email"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={state.subject}
            placeholder="Enter subject"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={state.message}
            rows="3"
            placeholder="Enter your message"
            onChange={onInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );

}