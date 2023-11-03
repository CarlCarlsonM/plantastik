import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default class Login extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <div className="bg-image biggie-bg-image">
                <div className="mask">
                  <div className="container d-flex justify-content-center align-items-center h-100"></div>
                </div>
              </div>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <Form className="w-100">
                <h1 class="mb-3">¡Bienvenid@ a Plantastik!</h1>
                <h5 class="mb-4">
                  Comparte y evalua las experiencias que más te importan.
                </h5>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Ingresa tu email" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Link
                    className="btn btn-outline-primary"
                    to={"/user-info"}
                    size="lg"
                  >
                    Iniciar Sesión 
                  </Link>
                </div>
                <Form.Text id="passwordHelpBlock" muted>
                  ¿No tienes una cuenta?{" "}
                  <Link to={"/register"}>Registrate ahora</Link> y vuélvete
                  Plantástik@.
                </Form.Text>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
