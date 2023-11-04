import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Axios from 'axios';

export default class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        password: '',
        gender: '',
        age: '',
        role: 'USER',
      };
    }
  render() {
    const { name, email, password, gender, age, role } = this.state;
    

    /*
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [gender,setGender] = useState("");
    const [age,setAge] = useState("");
    const [role,setRole] = useState("USER");
    */

    const add = () => {
      Axios.post("http://localhost:3001/create", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        gender: this.state.gender,
        age: this.state.age,
        role: this.state.role,
      }).then(() => {
        alert("USUARIO CREADO");
      });
    };
  


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
            <Col className="mt-4">
              <h1 class="mb-2">¿Nuev@ por aquí? Unete al parche.</h1>
              <h5 class="mb-4">
                Al ser usuario, podrás subir planes y calificar a los que ya
                fuiste. ¡Comparte tus experiencias con el mundo!
              </h5>
              <Form className="w-100">
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Ingresa tu nombre" 
                  onChange={(event) => this.setState({ name: event.target.value })} />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Ingresa tu email"
                  onChange={(event) => this.setState({ email: event.target.value })}  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Select aria-label="Default select example" 
                  onChange={(event) => this.setState({ gender: event.target.value })} >
                    <option>¿Cuál es tu género?</option>
                    <option value="1">Masculino</option>
                    <option value="2">Femenino</option>
                    <option value="3">
                      Plantastik (prefiero no indicarlo)
                    </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control type="number" placeholder="Ingresa tu edad" 
                  onChange={(event) => this.setState({ age: event.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Crea una contraseña"
                    onChange={(event) => this.setState({ password: event.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Certifico que soy mayor de edad"
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Link
                    className="btn btn-outline-primary"
                    to={"/user-info"}
                    size="lg"
                    onClick={add}
                  >
                    Regístrate
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
