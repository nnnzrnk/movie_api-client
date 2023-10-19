import React, { useState } from "react";
import { Form, Button, Col, Row, Container, Card, CardBody, CardTitle } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      password: password,
    };

    try {
      const response = await fetch("https://movie-api-da5i.onrender.com/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (response.ok) {
        const responseData = await response.json();
        // console.log('token', responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));
        localStorage.setItem("token", responseData.token);
        onLoggedIn(name);
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <Container >
      <Row>
      <Col>
      <Card className="shadow p-4 mb-4 bg-white mt-5 border-0">
        <CardBody>
          <CardTitle className="card-title">Login</CardTitle>
        <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button type="submit" className="submit">
        Submit
      </Button>
    </Form>
        </CardBody>
      </Card>
      </Col>
      </Row>
    </Container>
  );
};