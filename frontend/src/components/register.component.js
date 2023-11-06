import React, { Component, useState } from "react";
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
        errors: {}
      };
    }
  render() {
    const { name, email, password, gender, age, role,errors } = this.state;
    

    function validation(values){
      
      let error = {};
      error.email="";
      error.password="";
      error.name="";
      error.age ="";

      // Validar que el nombre no esté vacío
      if (!name.trim()) {
        error.name = "El nombre no puede estar vacío.";
      }

      if (isNaN(age) || age <= 0) {
        error.age = "Por favor, introduce una edad válida.";
      }
      

      // Expresión regular para validar el correo electrónico
      let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(email)) {
          error.email= "El correo electrónico no es válido.";
      }

      // La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
      let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
          error.password = "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.";
      }

      return error;

    }

    const handleInput = (event) => {
      
      this.setState({
        [event.target.name]: event.target.value
       });

    }

    const handleSubmit = (event) => {
      
      event.preventDefault();
      this.setState({ errors: validation(name, email,gender,age, password) });

      if(errors.name === "" && errors.email ==="" && errors.password === "" && errors.age === ""){
        add();
        
        

      }
    }
    


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
              <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control 
                    type="text" 
                    name="name"
                    placeholder="Ingresa tu nombre" 
                    onChange={handleInput} />
                  {errors.name && <span className="text-danger">{errors.name}</span>}
                

                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Control 
                    type="email"
                    name ="email" 
                    placeholder="Ingresa tu email"
                    onChange={handleInput} />
                  {errors.email && <span className="text-danger">{errors.email}</span>}
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
                  {errors.age && <span className="text-danger">{errors.age}</span>}
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Crea una contraseña"
                    onChange={handleInput}
                  />
                  {errors.password && <span className="text-danger">{errors.password}</span>}
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
}
