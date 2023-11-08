import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Axios from 'axios';
export default function Login()  {
  

  const [state, setState] = useState({
    password: '',
    email: '',
    errors: {}
    
  });
  const navigate = useNavigate()

  const validation = (values) =>{
      
    let error = {};
    error.email="";
    error.password="";

    // Expresión regular para validar el correo electrónico
    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(state.email)) {
        error.email= "El correo electrónico no es válido.";
    }

    // La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(state.password)) {
        error.password = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
    }
    return error;
  }

  const handleInput = (event) => {
      
    setState({
      [event.target.name]: event.target.value
     });

  }

  const handleSubmit = (event) => {
      
    event.preventDefault();
    setState({ errors: validation(state.email, state.password) });

  }
  
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
            <Form className="w-100" onSubmit={handleSubmit}>
              <h1 class="mb-3">¡Bienvenid@ a Plantastik!</h1>
              <h5 class="mb-4">
                Comparte y evalua las experiencias que más te importan.
              </h5>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Control 
                  type="email"
                  name="email" 
                  placeholder="Ingresa tu email" 
                  onChange={handleInput}
                />
                {state.errors.email && <span className="text-danger">{state.errors.email}</span>}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  onChange={handleInput}
                
                />
                {state.errors.password && <span className="text-danger">{state.errors.password}</span>}
              </Form.Group>
              <div className="d-grid gap-2">
              <input className="btn btn-outline-primary" size="lg" type="submit" value="Iniciar Sesión" />
              
                
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
