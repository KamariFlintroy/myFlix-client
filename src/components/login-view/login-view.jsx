import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export const LoginView = ({ onLoggedIn }) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username,
      Password
    };
    fetch('https://rocky-ravine-68908-c80297ae2b6b.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.users));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        console.error('Error during fetch: ', e.message);
        alert('Something went wrong');
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username:
          <Form.Control
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
          />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>
          Password:
          <Form.Control
            type="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Label>
      </Form.Group>
      <Button variant='primary' type="submit">Submit </Button>
    </Form>
  );
};
