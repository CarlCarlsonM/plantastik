import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Axios from 'axios';
export default function Login()  {
  
  const {authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn} = useAuth(); 

  

  const [state, setState] = useState({
    password: '',
    email: '',
    login: false,
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
    
    if (!state.password.trim()) {
      error.password = "la contraseña no puede ser vacia.";
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

    if(errors.email ==="" && errors.password === ""){
        
       login();
      
    }else{
      alert("FALLO EN EL INICIO DE SESION");
    }

  }

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      email: state.email,
      password: state.password,
    }).then((res) => {
        if(res.data.message === "Success"){
          navigate("/user-info");
          setState({
            ...state,
            login: true
          });

          
          setIsLoggedIn(true)
          setAuthUser({
            idUser: res.data.userData.id_user,
            name: res.data.userData.name
          })

        
          
        }else{
          alert("no record existed")
        }
      
      
      

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
