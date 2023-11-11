import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Axios from 'axios';

export default function Register() {
    
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    role: 'USER',
    userRegistered: false,
    errors: {}
    
  });
  const navigate = useNavigate()
  

  const validation = (values) =>{
      
      let error = {};
      error.email="";
      error.password="";
      error.name="";
      error.age ="";

      // Validar que el nombre no esté vacío
      if (!state.name.trim()) {
        error.name = "El nombre no puede estar vacío.";
      }
      
      if (isNaN(state.age) || state.age <= 0) {
        error.age = "Por favor, introduce una edad válida.";
      }
      

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
        ...state,
        [event.target.name]: event.target.value
       });
    }
    
    
    const handleSubmit = (event) => {
      event.preventDefault();

      const errors = validation(state.name, state.email,state.gender,state.age, state.password);

      setState({
        ...state,
        errors: errors
      });
      
      
      
      if(errors.name === "" && errors.email ==="" && errors.password === "" && errors.age === ""){
        
        add(); 
        
      }else{
        alert("USUARIO NO CREADO");
      }
    }
    
    const add = () => {
      Axios.post("http://localhost:3001/create", {
        name: state.name,
        email: state.email,
        password: state.password,
        gender: state.gender,
        age: state.age,
        role: state.role,
      }).then(() => {
        alert("USUARIO CREADO");
        state.userRegistered= true;
        
        navigate("/login");

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
              
              <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control 
                    type="text" 
                    name="name"
                    placeholder="Ingresa tu nombre" 
                    onChange={handleInput} />
                  {state.errors.name && <span className="text-danger">{state.errors.name}</span>}
                
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control 
                    type="email"
                    name ="email" 
                    placeholder="Ingresa tu email"
                    onChange={handleInput} />
                  {state.errors.email && <span className="text-danger">{state.errors.email}</span>}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Select aria-label="Default select example" 
                    name="gender"
                    onChange={handleInput} >
                    <option>¿Cuál es tu género?</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Plantastik">
                      Plantastik (prefiero no indicarlo)
                    </option>
                  </Form.Select>   
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control 
                    type="number"
                    name="age"
                    placeholder="Ingresa tu edad" 
                    onChange={handleInput}/>
                  {state.errors.age && <span className="text-danger">{state.errors.age}</span>}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Crea una contraseña"
                    onChange={handleInput}
                  />
                  {state.errors.password && <span className="text-danger">{state.errors.password}</span>}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Certifico que soy mayor de edad"
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <input className="btn btn-outline-primary" size="lg" type="submit" value="Registrate" />
                </div> 
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  
}
